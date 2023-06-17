from flask import Flask, Response, render_template
import threading
import argparse
import os
import random
import time

import cv2
import numpy as np
from utils import visualization as visual
from utils.label_util import read_label_file
from utils.tflite_util import (get_output_tensor, make_interpreter,
                               set_input_tensor)
from flask_cors import CORS
import eventlet

app = Flask(__name__)
CORS(app, origins='*')

WINDOW_NAME = "TF-lite object detection (OpenCV)"

outputFrame = None
lock = threading.Lock()


@app.route('/')
def index():
    return render_template('index.html')


def generate():
    global outputFrame, lock

    while True:
        with lock:
            if outputFrame is None:
                continue
            
            (flag, encodedImage) = cv2.imencode(".jpg", outputFrame)

            if not flag:
                continue

        yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + 
               bytearray(encodedImage) + b'\r\n')


@app.route('/video_feed')
def video_feed():
    return Response(generate(),
                    mimetype = "multipart/x-mixed-replace; boundary=frame")


def get_output(interpreter, score_threshold):
    boxes = get_output_tensor(interpreter, 0)
    class_ids = get_output_tensor(interpreter, 1)
    scores = get_output_tensor(interpreter, 2)
    count = int(get_output_tensor(interpreter, 3))

    results = []
    for i in range(count):
        if scores[i] >= score_threshold:
            result = {
                "bounding_box": boxes[i],
                "class_id": class_ids[i],
                "score": scores[i],
            }
            results.append(result)
    return results


def main_process():
    global outputFrame, lock

    parser = argparse.ArgumentParser()
    parser.add_argument("--model", help="dummies_model.tflite", default="dummies_model.tflite")
    parser.add_argument("--label", help="dummies.txt", default="dummies.txt")
    parser.add_argument("--threshold", help="threshold to filter results.", default=0.8, type=float)
    parser.add_argument("--width", help="Resolution width.", default=640, type=int)
    parser.add_argument("--height", help="Resolution height.", default=480, type=int)
    parser.add_argument("--thread", help="Num threads.", default=2, type=int)
    parser.add_argument("--videopath", help="File path of Videofile.", default="")
    parser.add_argument("--output", help="File path of result.", default="")
    parser.add_argument("--delegate", help="File path of result.", default=None)
    args = parser.parse_args()

    cv2.namedWindow(
        WINDOW_NAME, cv2.WINDOW_GUI_NORMAL | cv2.WINDOW_AUTOSIZE | cv2.WINDOW_KEEPRATIO
    )
    cv2.moveWindow(WINDOW_NAME, 100, 200)

    interpreter = make_interpreter(args.model, args.thread, args.delegate)
    interpreter.allocate_tensors()
    _, height, width, channel = interpreter.get_input_details()[0]["shape"]
    print("Interpreter(height, width, channel): ", height, width, channel)

    labels = read_label_file(args.label) if args.label else None
    last_key = sorted(labels.keys())[len(labels.keys()) - 1]
    random.seed(42)
    colors = visual.random_colors(last_key)

    if args.videopath == "":
        print("open camera.")
        cap = cv2.VideoCapture(0)
        cap.set(cv2.CAP_PROP_FRAME_WIDTH, args.width)
        cap.set(cv2.CAP_PROP_FRAME_HEIGHT, args.height)
    else:
        print("open video file", args.videopath)
        cap = cv2.VideoCapture(args.videopath)

    w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    print("Input(height, width, fps): ", h, w, fps)

    model_name = os.path.splitext(os.path.basename(args.model))[0]

    video_writer = None
    if args.output != "":
        fourcc = cv2.VideoWriter_fourcc(*"MP4V")
        video_writer = cv2.VideoWriter(args.output, fourcc, fps, (w, h))

    elapsed_list = []
    img_count = 0
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            print("VideoCapture read return false.")
            break

        im = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        resize_im = cv2.resize(im, (width, height))

        start = time.perf_counter()

        set_input_tensor(interpreter, resize_im)
        interpreter.invoke()
        objs = get_output(interpreter, args.threshold)

        inference_time = (time.perf_counter() - start) * 1000

        for obj in objs:
            class_id = int(obj["class_id"])
            caption = "{0}({1:.2f})".format(labels[class_id], obj["score"])

            ymin, xmin, ymax, xmax = obj["bounding_box"]
            xmin = int(xmin * w)
            xmax = int(xmax * w)
            ymin = int(ymin * h)
            ymax = int(ymax * h)

            visual.draw_rectangle(frame, (xmin, ymin, xmax, ymax), colors[class_id])
            visual.draw_caption(frame, (xmin, ymin, xmax, ymax), caption)
            
            right_third_x_start = int(2 * w / 3)
            cv2.rectangle(frame, (right_third_x_start, 0), (w, h), (0, 255, 0), 2)

            if labels[class_id] == 'cow' and xmin >= right_third_x_start:
                img_count += 1
                cv2.imwrite(f"captured_cow_{img_count}.jpg", frame)

        elapsed_list.append(inference_time)
        avg_text = ""
        if len(elapsed_list) > 100:
            elapsed_list.pop(0)
            avg_elapsed_ms = np.mean(elapsed_list)
            avg_text = " AGV: {0:.2f}ms".format(avg_elapsed_ms)

        fps_text = "Inference: {0:.2f}ms".format(inference_time)
        display_text = model_name + " " + fps_text + avg_text
        visual.draw_caption(frame, (10, 30), display_text)

        if video_writer is not None:
            video_writer.write(frame)

        cv2.imshow(WINDOW_NAME, frame)
        if cv2.waitKey(10) & 0xFF == ord("q"):
            break

        with lock:
            outputFrame = frame.copy()

    cap.release()
    if video_writer is not None:
        video_writer.release()
    cv2.destroyAllWindows()


if __name__ == '__main__':
    t = threading.Thread(target=main_process)
    t.daemon = True
    t.start()
    
    app.run(host='0.0.0.0', port='4000', debug=True,
            threaded=True, use_reloader=False)

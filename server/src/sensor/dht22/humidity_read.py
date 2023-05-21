import adafruit_dht
import board
import json


def read_humidity_data():
    dht_sensor = adafruit_dht.DHT22(board.D4)
    try:
        humidity = dht_sensor.humidity

        data = {
            'humidity': humidity,
        }

        return json.dumps(data)

    except RuntimeError as error:
        print(f'Error reading sensor data: {error}')
        return None


if __name__ == '__main__':
    sensor_data = read_humidity_data()
    print(sensor_data)

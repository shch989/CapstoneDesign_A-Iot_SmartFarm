import adafruit_dht
import board
import json


def read_temperature_data():
    dht_sensor = adafruit_dht.DHT22(board.D4)
    try:
        temperature = dht_sensor.temperature

        data = {
            'temperature': temperature,
        }

        return json.dumps(data)

    except RuntimeError as error:
        print(f'Error reading sensor data: {error}')
        return None


if __name__ == '__main__':
    sensor_data = read_temperature_data()
    print(sensor_data)

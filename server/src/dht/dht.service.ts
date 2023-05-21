import { HttpException, Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import * as dhtSensor from 'node-dht-sensor';


@Injectable()
export class DhtService {

  async getTemperature(): Promise<any> {
    const temperature = new Promise((resolve, reject) => {
      exec('python3 src/sensor/dht22/temperature_read.py', (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          console.log(stdout); // stdout 내용 출력
          try {
            const data = JSON.parse(stdout);
            resolve(data);
          } catch (parseError) {
            reject(parseError);
          }
        }
      });
    });
    return temperature;
  }

  // async getTemperature(): Promise<{ temperature: number }> {
  //   const sensorType = 22;
  //   const pin = 4;
  //   try {
  //     const data = dhtSensor.read(sensorType, pin);
  //     const temperature = data.temperature.toFixed(2);
  //     return { temperature: parseFloat(temperature) };
  //   } catch (err) {
  //     throw new HttpException(err.message, err.status || 500)
  //   }
  // }

  async getHumidity(): Promise<any> {
    const humidity = new Promise((resolve, reject) => {
      exec('python3 src/sensor/dht22/humidity_read.py', (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          console.log(stdout);
          try {
            const data = JSON.parse(stdout);
            resolve(data);
          } catch (parseError) {
            reject(parseError);
          }
        }
      });
    });
    return humidity;
  }

  // async getHumidity(): Promise<{ humidity: number }> {
  //   const sensorType = 22;
  //   const pin = 4;
  //   try {
  //     const data = dhtSensor.read(sensorType, pin);
  //     const humidity = data.humidity.toFixed(2);
  //     return { humidity: parseFloat(humidity) };
  //   } catch (err) {
  //     throw new HttpException(err.message, err.status || 500)
  //   }
  // }
}
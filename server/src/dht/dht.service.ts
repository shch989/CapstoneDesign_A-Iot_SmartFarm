import { HttpException, Injectable } from '@nestjs/common';
import * as dhtSensor from 'node-dht-sensor';


@Injectable()
export class DhtService {

  async getTemperature(): Promise<{ temperature: number }> {
    const sensorType = 22;
    const pin = 4;
    try {
      const data = dhtSensor.read(sensorType, pin);
      const temperature = data.temperature.toFixed(2);
      return { temperature: parseFloat(temperature) };
    } catch (err) {
      throw new HttpException(err.message, err.status || 500)
    }
  }

  async getHumidity(): Promise<{ humidity: number }> {
    const sensorType = 22;
    const pin = 4;
    try {
      const data = dhtSensor.read(sensorType, pin);
      const humidity = data.humidity.toFixed(2);
      return { humidity: parseFloat(humidity) };
    } catch (err) {
      throw new HttpException(err.message, err.status || 500)
    }
  }
}
import { HttpException, Injectable } from '@nestjs/common';
import * as dhtSensor from 'node-dht-sensor';


@Injectable()
export class DhtService {
  constructor() {}

  async getTemperature(): Promise<{ temperature: number }> {
    const sensorType = 22;
    const pin = 4;
    try {
      const data = dhtSensor.read(sensorType, pin);
      const temperature = parseFloat(data.temperature.toFixed(2));
      return { temperature: temperature };
    } catch (err) {
      throw new HttpException(err.message, err.status || 500)
    }
  }

  async getHumidity(): Promise<{ humidity: number }> {
    const sensorType = 22;
    const pin = 4;
    try {
      const data = dhtSensor.read(sensorType, pin);
      const humidity = parseFloat(data.humidity.toFixed(2));
      return { humidity: humidity };
    } catch (err) {
      throw new HttpException(err.message, err.status || 500)
    }
  }
}
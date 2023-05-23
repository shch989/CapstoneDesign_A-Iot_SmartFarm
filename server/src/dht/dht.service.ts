import { HttpException, Injectable } from '@nestjs/common';
import * as dhtSensor from 'node-dht-sensor';


@Injectable()
export class DhtService {
  constructor() { }

  async getTemperature(): Promise<number> {
    const sensorType = 22;
    const pin = 4;
    try {
      const data = dhtSensor.read(sensorType, pin);
      const temperature = parseFloat(data.temperature.toFixed(2));
      return temperature
    } catch (err) {
      throw new HttpException(err.message, err.status || 500)
    }
  }

  async getHumidity(): Promise<number> {
    const sensorType = 22;
    const pin = 4;
    try {
      const data = dhtSensor.read(sensorType, pin);
      const humidity = parseFloat(data.humidity.toFixed(2));
      return humidity;
    } catch (err) {
      throw new HttpException(err.message, err.status || 500)
    }
  }
}
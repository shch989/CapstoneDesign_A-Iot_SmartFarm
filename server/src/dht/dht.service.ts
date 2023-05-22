import { HttpException, Injectable } from '@nestjs/common';
import * as dhtSensor from 'node-dht-sensor';
import { DhtGateway } from './dht.gateway';


@Injectable()
export class DhtService {
  constructor(private readonly dhtGateway: DhtGateway) {}

  async getTemperature(): Promise<{ temperature: number }> {
    const sensorType = 22;
    const pin = 4;
    try {
      const data = dhtSensor.read(sensorType, pin);
      const temperature = parseFloat(data.temperature.toFixed(2));

      this.dhtGateway.addTemperature(temperature);
      this.dhtGateway.sendTemperatureUpdate();
      
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

      this.dhtGateway.addHumidity(humidity);
      this.dhtGateway.sendHumidityUpdate();

      return { humidity: humidity };
    } catch (err) {
      throw new HttpException(err.message, err.status || 500)
    }
  }
}
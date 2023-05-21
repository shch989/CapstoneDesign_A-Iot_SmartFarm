import { Body, Controller, Get, Post } from '@nestjs/common';
import { DhtService } from './dht.service';

@Controller('dht')
export class DhtController {
  constructor(private readonly dhtService: DhtService) { }

  @Get('/temperature')
  getTemperature(): Promise<{ temperature: number }> {
    const temperature = this.dhtService.getTemperature();
    return temperature;
  }

  @Get('/humidity')
  getHumidity(): Promise<{ humidity: number }> {
    const humidity = this.dhtService.getHumidity();
    return humidity;
  }
}

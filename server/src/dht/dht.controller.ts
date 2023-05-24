import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { DhtService } from './dht.service';


@Controller('dht')
export class DhtController {
  constructor(private readonly dhtService: DhtService) { }

  @Get('/temperature')
  async getTemperature(): Promise<number> {
    return this.dhtService.getTemperature()
  }

  @Get('/humidity')
  async getHumidity(): Promise<number> {
    return this.dhtService.getHumidity()
  }

}

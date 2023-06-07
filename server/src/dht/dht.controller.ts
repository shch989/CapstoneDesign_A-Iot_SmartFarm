import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
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

  @Get('/:id')
  async getHumidityByUserId(@Param('id') userId: string) {
    return this.dhtService.getDhtDataByUserId(userId)
  }

}

import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { DhtService } from './dht.service';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';


@Controller('dht')
export class DhtController {
  constructor(private readonly dhtService: DhtService) { }

  @UseInterceptors(SuccessInterceptor)
  @Get('/temperature')
  async getTemperature(): Promise<{ temperature: number }> {
    return this.dhtService.getTemperature()
  }

  @UseInterceptors(SuccessInterceptor)
  @Get('/humidity')
  async getHumidity(): Promise<{ humidity: number }> {
    return this.dhtService.getHumidity()
  }

}

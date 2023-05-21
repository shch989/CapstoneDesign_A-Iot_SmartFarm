import { Body, Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { DhtService } from './dht.service';
import { exec } from 'child_process';


@Controller('dht')
export class DhtController {
  constructor(private readonly dhtService: DhtService) { }

  @Get('/temperature')
  async getTemperature(): Promise<{ temperature: number }> {
    return this.dhtService.getTemperature()
  }

  @Get('/humidity')
  async getHumidity(): Promise<{ humidity: number }> {
    return this.dhtService.getHumidity()
  }
}

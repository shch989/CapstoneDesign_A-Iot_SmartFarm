import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FanService } from './fan.service';

@Controller('fan')
export class FanController {
  constructor(private readonly fanService: FanService) {}

  @Get('rotate')
  rotateFan() {
    this.fanService.rotateFan();
    return '송풍팬 작동 중';
  }

  @Get('stop')
  stopFan() {
    this.fanService.stop();
    return '송풍팬 정지';
  }
}
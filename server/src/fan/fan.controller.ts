import { Controller, Get } from '@nestjs/common';
import { FanService } from './fan.service';

@Controller('fan')
export class FanController {
  constructor(private readonly fanService: FanService) { }
  @Get('on')
  turnOnFan() {
    return this.fanService.turnOnFan()
  }

  @Get('off')
  turnOffFan() {
    return this.fanService.turnOffFan()
  }
}

import { Controller, Get } from '@nestjs/common';
import { MotorService } from './motor.service';

@Controller('motor')
export class MotorController {
  constructor(private readonly motorService: MotorService) {}

  @Get('forward')
  forward() {
    this.motorService.rotateForward();
  }

  @Get('backward')
  backward() {
    this.motorService.rotateBackward();
  }

  @Get('stop')
  stop() {
    this.motorService.stop();
  }
}

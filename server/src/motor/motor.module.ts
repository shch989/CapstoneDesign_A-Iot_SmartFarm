import { Module } from '@nestjs/common';
import { MotorController } from './motor.controller';
import { MotorService } from './motor.service';

@Module({
  controllers: [MotorController],
  providers: [MotorService]
})
export class MotorModule {}

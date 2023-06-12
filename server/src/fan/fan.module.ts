import { Module } from '@nestjs/common';
import { FanService } from './fan.service';
import { FanController } from './fan.controller';

@Module({
  providers: [FanService],
  controllers: [FanController]
})
export class FanModule {}

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Gpio } from 'onoff';

@Injectable()
export class FanService implements OnModuleInit, OnModuleDestroy {
  private fan: Gpio;

  private fanPin = 20;

  onModuleInit() {
    this.fan = new Gpio(this.fanPin, 'out');
  }

  onModuleDestroy() {
    this.stop();
    this.fan.unexport();
  }

  rotateFan() {
    console.log('송풍팬 작동');
    this.fan.writeSync(1);
  }

  stop() {
    console.log('송풍팬 정지');
    this.fan.writeSync(0);
  }
}

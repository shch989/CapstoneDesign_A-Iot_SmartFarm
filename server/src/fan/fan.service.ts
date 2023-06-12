import { Injectable } from '@nestjs/common';
import { Gpio } from 'onoff';

@Injectable()
export class FanService {
  private fanPin: Gpio;

  constructor() {
    this.fanPin = new Gpio(17, 'out');
  }

  turnOnFan() {
    this.fanPin.writeSync(1);
    return 'Fan turned on';
  }

  turnOffFan() {
    this.fanPin.writeSync(0);
    return 'Fan turned off';
  }
}

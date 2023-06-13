import { Injectable } from '@nestjs/common';
import { Gpio } from 'onoff';

@Injectable()
export class FanService {
  private fanPin: Gpio;
  private enablePin: Gpio;

  constructor() {
    this.fanPin = new Gpio(17, 'out');
    this.enablePin = new Gpio(18, 'out');
  }

  turnOnFan() {
    this.enablePin.writeSync(1); // Enable B 채널 활성화
    this.fanPin.writeSync(1); // 송풍팬 동작
    return 'Fan turned on';
  }

  turnOffFan() {
    this.fanPin.writeSync(0); // 송풍팬 정지
    this.enablePin.writeSync(0); // Enable B 채널 비활성화
    return 'Fan turned off';
  }
}

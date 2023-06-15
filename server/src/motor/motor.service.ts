import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Gpio } from 'onoff';

@Injectable()
export class MotorService implements OnModuleInit, OnModuleDestroy {
  private motor: Gpio;
  private motorReverse: Gpio;
  private forwardPin = 20;
  private backwardPin = 21;

  onModuleInit() {
    this.motor = new Gpio(this.forwardPin, 'out');
    this.motorReverse = new Gpio(this.backwardPin, 'out');
  }

  onModuleDestroy() {
    this.stop();
    this.motor.unexport();
    this.motorReverse.unexport();
  }

  rotateForward() {
    console.log('모터 회전 방향: Forward');
    this.motor.writeSync(1);
    this.motorReverse.writeSync(0);
  }

  rotateBackward() {
    console.log('모터 회전 방향: Backward');
    this.motor.writeSync(0);
    this.motorReverse.writeSync(1);
  }

  stop() {
    console.log('모터 정지');
    this.motor.writeSync(0);
    this.motorReverse.writeSync(0);
  }
}
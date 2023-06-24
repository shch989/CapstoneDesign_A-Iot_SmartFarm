import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Gpio } from 'onoff';

@Injectable()
export class MotorService implements OnModuleInit, OnModuleDestroy {
  private motors: { [key: string]: Gpio } = {};
  private pins = {
    A: { forward: 20, backward: 21 },
    B: { forward: 19, backward: 26 },
    C: { forward: 5, backward: 6 },
    D: { forward: 7, backward: 8 },
  };

  onModuleInit() {
    Object.keys(this.pins).forEach((motor) => {
      const { forward, backward } = this.pins[motor];
      this.motors[motor] = new Gpio(forward, 'out');
      this.motors[`reverse${motor}`] = new Gpio(backward, 'out');
    });
  }

  onModuleDestroy() {
    this.stop();
    Object.values(this.motors).forEach((motor) => motor.unexport());
  }

  rotateForward() {
    console.log('모터 회전 방향: Forward');
    Object.keys(this.pins).forEach((motor) => this.motors[motor].writeSync(1));
  }

  rotateBackward() {
    console.log('모터 회전 방향: Backward');
    Object.keys(this.pins).forEach((motor) =>
      this.motors[`reverse${motor}`].writeSync(1)
    );
  }

  stop() {
    console.log('모터 정지');
    Object.values(this.motors).forEach((motor) => motor.writeSync(0));
  }
}
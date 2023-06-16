import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Gpio } from 'onoff';

@Injectable()
export class MotorService implements OnModuleInit, OnModuleDestroy {
  private motorA: Gpio;
  private motorReverseA: Gpio;
  private motorB: Gpio;
  private motorReverseB: Gpio;
  private motorC: Gpio;
  private motorReverseC: Gpio;
  private motorD: Gpio;
  private motorReverseD: Gpio;
  private forwardPinA = 20;
  private backwardPinA = 21;
  private forwardPinB = 19;  private backwardPinB = 26;
  private forwardPinC = 5;
  private backwardPinC = 6;
  private forwardPinD = 7;
  private backwardPinD = 8;

  onModuleInit() {
    this.motorA = new Gpio(this.forwardPinA, 'out');
    this.motorReverseA = new Gpio(this.backwardPinA, 'out');
    this.motorB = new Gpio(this.forwardPinB, 'out');
    this.motorReverseB = new Gpio(this.backwardPinB, 'out');
    this.motorC = new Gpio(this.forwardPinC, 'out');
    this.motorReverseC = new Gpio(this.backwardPinC, 'out');
    this.motorD = new Gpio(this.forwardPinD, 'out');
    this.motorReverseD = new Gpio(this.backwardPinD, 'out');
  }

  onModuleDestroy() {
    this.stop();
    this.motorA.unexport();
    this.motorReverseA.unexport();
    this.motorB.unexport();
    this.motorReverseB.unexport();
    this.motorC.unexport();
    this.motorReverseC.unexport();
    this.motorD.unexport();
    this.motorReverseD.unexport();
  }

  rotateForward() {
    console.log('모터 회전 방향: Forward');
    this.motorA.writeSync(1);
    this.motorB.writeSync(1);
    this.motorC.writeSync(1);
    this.motorD.writeSync(1);
  }

  rotateBackward() {
    console.log('모터 회전 방향: Backward')
    this.motorReverseA.writeSync(1);
    this.motorReverseB.writeSync(1);
    this.motorReverseC.writeSync(1);
    this.motorReverseD.writeSync(1);
  }

  stop() {
    console.log('모터 정지');
    this.motorA.writeSync(0);
    this.motorReverseA.writeSync(0);
    this.motorB.writeSync(0);
    this.motorReverseB.writeSync(0);
    this.motorC.writeSync(0);
    this.motorReverseC.writeSync(0);
    this.motorD.writeSync(0);
    this.motorReverseD.writeSync(0);
  }
}
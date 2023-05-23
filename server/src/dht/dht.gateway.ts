import {  OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SensorType, initialize as initializeSensor, read as readSensor } from 'node-dht-sensor';

@WebSocketGateway(5000, { namespace: 'dht' })
export class DhtGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    initializeSensor(22, 4); // SensorType과 핀 번호에 맞게 수정
    this.startSensorReading();
  }

  private startSensorReading() {
    setInterval(() => {
      const sensorData = this.readSensorData();
      this.server.emit('sensorData', sensorData);
    }, 5000); // 주기적으로 센서 값을 읽고 WebSocket으로 전송 (5초마다)
  }

  private readSensorData() {
    const data = readSensor();
    const temperature = parseFloat(data.temperature.toFixed(2));
    const humidity = parseFloat(data.humidity.toFixed(2));
    return { temperature, humidity };
  }
}
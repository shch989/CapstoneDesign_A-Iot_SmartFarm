import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'dht' })
export class DhtGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private temperatures: number[] = [];
  private humidities: number[] = []

  handleConnection(client: Socket) {
    // 클라이언트 연결 시 최신 온도 값 전송
    client.emit('temperatureUpdate', this.temperatures);
    client.emit('humidityUpdate', this.humidities)
  }

  handleDisconnect() { }

  sendTemperatureUpdate() {
    this.server.emit('temperatureUpdate', this.temperatures);
  }
  addTemperature(temperature: number) {
    this.temperatures.push(temperature);
    if (this.temperatures.length > 5) {
      this.temperatures.shift();
    }
  }

  sendHumidityUpdate() {
    this.server.emit('humidityUpdate', this.humidities);
  }
  addHumidity(humidity: number) {
    this.humidities.push(humidity);
    if (this.humidities.length > 5) {
      this.humidities.shift();
    }
  }
}

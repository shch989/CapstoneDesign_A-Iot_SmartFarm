import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { DhtService } from './dht.service';
import { Server } from 'socket.io';

@WebSocketGateway(5000, { namespace: 'dht', cors: { origin: '*' } })
export class DhtGateway implements OnGatewayConnection {
  private temperatureArray: number[] = [];
  private humidityArray: number[] = [];
  private interval: NodeJS.Timeout | undefined;

  private dummyId: string = '647226b973194d41c6fb0013'

  constructor(private readonly dhtService: DhtService) { }

  @WebSocketServer()
  server: Server;

  handleConnection() {
    if (!this.interval) {
      this.accessData(); // 최초 실행
      this.interval = setInterval(() => {
        this.updateData(); // 주기적으로 실행
      }, 5000);
    }
  }

  private async accessData() {
    try {
      // 로그인 기능 완성 후 수정 필요
      const { temperature, humidity } = await this.dhtService.getDhtDataByUserId(this.dummyId);
      this.temperatureArray = temperature;
      this.humidityArray = humidity;

      this.emitData();
    } catch (err) {
      console.error(err);
    }
  }

  private async updateData() {
    try {
      const temperatureData = await this.dhtService.getTemperature();
      const humidityData = await this.dhtService.getHumidity();

      this.temperatureArray.push(temperatureData);
      this.humidityArray.push(humidityData);

      if (this.temperatureArray.length > 10) {
        this.temperatureArray.shift();
      }

      if (this.humidityArray.length > 10) {
        this.humidityArray.shift();
      }

      await this.dhtService.updateDhtDataByUserId(this.dummyId, this.temperatureArray, this.humidityArray);

      this.emitData();
    } catch (err) {
      console.error(err);
    }
  }

  private emitData() {
    this.server.emit('temperatureData', this.temperatureArray);
    this.server.emit('humidityData', this.humidityArray);
    console.log('temperature', this.temperatureArray);
    console.log('humidity', this.humidityArray);
  }
}
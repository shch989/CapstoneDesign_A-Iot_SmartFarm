import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { DhtService } from './dht.service';
import { Server } from 'socket.io';

@WebSocketGateway(5000, { namespace: 'dht', cors: { origin: '*' } })
export class DhtGateway implements OnGatewayConnection {
  private temperatureArray: number[] = [];
  private humidityArray: number[] = [];
  private interval: NodeJS.Timeout | undefined;

  // 더미 아이디값
  private dummyId: string = '647f6a5c2dfe4e3f6beadf5c'

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
      const userData = await this.dhtService.getDhtDataByUserId(this.dummyId);
      const { temperature, humidity } = userData

      this.emitData(temperature, humidity);
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

  private emitData(temperature: number[], humidity: number[]) {
    this.server.emit('temperatureData', temperature);
    this.server.emit('humidityData', humidity);
    console.log('temperature', temperature);
    console.log('humidity', humidity);
  }
}
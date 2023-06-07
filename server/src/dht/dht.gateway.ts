import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { DhtService } from './dht.service';
import { Server } from 'socket.io';

@WebSocketGateway(5000, { namespace: 'dht', cors: { origin: '*' } })
export class DhtGateway implements OnGatewayConnection {
  private interval: NodeJS.Timeout | undefined;
  private readonly initialData = {
    temperature: [null, null, null, null, null, null, null, null, null, null],
    humidity: [null, null, null, null, null, null, null, null, null, null]
  };
  private dummyId: string = '648099cfce24a5b1337b1028';

  constructor(private readonly dhtService: DhtService) { }

  @WebSocketServer()
  server: Server;

  handleConnection() {
    if (!this.interval) {
      this.accessData();
      this.interval = setInterval(() => {
        this.updateData();
      }, 60000);
    }
  }

  private async accessData() {
    try {
      let userData = await this.dhtService.getDhtDataByUserId(this.dummyId);

      if (!userData) {
        userData = { ...this.initialData };
        return this.emitData(userData.temperature, userData.humidity);
      }

      return this.emitData(userData.temperature, userData.humidity);
    } catch (err) {
      console.error(err);
    }
  }

  private async updateData() {
    try {
      const temperatureData = await this.dhtService.getTemperature();
      const humidityData = await this.dhtService.getHumidity();

      let userData = await this.dhtService.getDhtDataByUserId(this.dummyId);

      if (!userData) {
        userData = { ...this.initialData };
        return this.emitData(userData.temperature, userData.humidity);
      }

      userData.temperature.push(temperatureData);
      userData.humidity.push(humidityData);

      if (userData.temperature.length > 10) {
        userData.temperature.shift();
      }

      if (userData.humidity.length > 10) {
        userData.humidity.shift();
      }

      await this.dhtService.updateDhtDataByUserId(this.dummyId, userData.temperature, userData.humidity);

      return this.emitData(userData.temperature, userData.humidity);
    } catch (err) {
      console.error(err);
    }
  }

  private emitTemperatureData(temperature: number[]) {
    this.server.emit('temperatureData', temperature);
    console.log('temperature', temperature);
  }

  private emitHumidityData(humidity: number[]) {
    this.server.emit('humidityData', humidity);
    console.log('humidity', humidity);
  }

  private emitData(temperature: number[], humidity: number[]) {
    this.emitTemperatureData(temperature);
    this.emitHumidityData(humidity);
  }
}

import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { DhtService } from './dht.service';
import { Server } from 'socket.io';
import { DataDto } from 'src/users/dtos/data.dto';

@WebSocketGateway(5000, { namespace: 'dht', cors: { origin: '*' } })
export class DhtGateway implements OnGatewayConnection {
  private interval: NodeJS.Timeout | undefined;
  private dummyId: string = '64821b32925e4d0aaa1389fa';

  constructor(private readonly dhtService: DhtService) { }

  @WebSocketServer()
  server: Server;

  handleConnection() {
    this.accessData();
    setInterval(() => {
      this.updateData();
    }, 60000);
  }


  private async accessData() {
    try {
      const sensorData = await this.dhtService.getDhtDataByUserId(this.dummyId);
      return this.emitData(sensorData);
    } catch (err) {
      console.error(err);
    }
  }

  private async updateData() {
    try {
      const temperatureData = await this.dhtService.getTemperature();
      const humidityData = await this.dhtService.getHumidity();

      const userData = await this.dhtService.getDhtDataByUserId(this.dummyId);

      userData.sensor.temperature.push(temperatureData);
      userData.sensor.humidity.push(humidityData);

      if (userData.sensor.temperature.length > 10) {
        userData.sensor.temperature.shift();
      }

      if (userData.sensor.humidity.length > 10) {
        userData.sensor.humidity.shift();
      }

      const updatedData = await this.dhtService.updateDhtDataByUserId(
        this.dummyId,
        userData.sensor.temperature,
        userData.sensor.humidity
      );

      return this.emitData(updatedData);
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

  private emitData(userData: DataDto) {
    this.emitTemperatureData(userData.sensor.temperature);
    this.emitHumidityData(userData.sensor.humidity);
  }
}

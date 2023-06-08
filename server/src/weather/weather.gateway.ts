import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WeatherService } from './weather.service';
import { DataDto } from 'src/users/dtos/data.dto';

@WebSocketGateway(5000, { namespace: 'weather', cors: { origin: '*' } })
export class WeatherGateway implements OnGatewayConnection {

  private dummyId: string = '64821b32925e4d0aaa1389fa';

  constructor(private readonly weatherService: WeatherService) { }

  @WebSocketServer()
  server: Server;

  handleConnection() {
    this.sendInitialWeatherData();
    this.updateWeatherData()
    setInterval(() => {
      this.updateWeatherData();
    }, 3600000);
  }

  // 최초 실행할 코드
  private async sendInitialWeatherData() {
    try {
      const weatherData = await this.weatherService.getWeatherDataByUserId(this.dummyId);
      return this.emitWeatherData(weatherData)
    } catch (err) {
      console.error(err);
    }
  }

  // 주기적으로 실행할 코드
  private async updateWeatherData() {
    try {
      const weatherData = await this.weatherService.saveWeatherData(this.dummyId)
      this.emitWeatherData(weatherData)

    } catch (err) {
      console.error(err);
    }
  }

  private emitWeatherData(userData: DataDto) {
    this.server.emit('weatherData', userData);
    console.log('weather', userData)
  }
}

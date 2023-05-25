import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WeatherService } from './weather.service';

@WebSocketGateway(5000, { namespace: 'weather', cors: { origin: '*' } })
export class WeatherGateway implements OnGatewayConnection {
  private weatherData: Object = { };

  constructor(private readonly weatherService: WeatherService) { }

  @WebSocketServer()
  server: Server;

  handleConnection() {
    this.sendInitialWeatherData();
    setInterval(() => {
      this.updateWeatherData();
    }, 60000); // 1시간(3600초)마다 실행
  }

  // 최초 실행할 코드
  private async sendInitialWeatherData() {
    try {
      const userId = '646e0212b67b3d5cb35d0f10'; // 더비 사용자 ID
      const weatherData = await this.weatherService.getWeather(userId);
      this.weatherData = weatherData;
      this.server.emit('weatherData', this.weatherData);
      console.log('Initial weatherData:', this.weatherData);
    } catch (err) {
      console.error(err);
    }
  }

  // 주기적으로 실행할 코드
  private async updateWeatherData() {
    try {
      const userId = '646e0212b67b3d5cb35d0f10'; // 더비 사용자 ID
      const weatherData = await this.weatherService.getWeather(userId);
      this.weatherData = weatherData;
      this.server.emit('weatherData', weatherData);
      console.log('Updated weatherData:', weatherData);
    } catch (err) {
      console.error(err);
    }
  }
}

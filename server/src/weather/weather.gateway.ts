import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WeatherService } from './weather.service';
import { WeatherDto } from './dtos/weather.dto';

@WebSocketGateway(5000, { namespace: 'weather', cors: { origin: '*' } })
export class WeatherGateway implements OnGatewayConnection {
  private readonly initialData = {
    "location": {
      "country": null
    },
    "current": {
      "temperature": null,
      "weather_descriptions": [
        null
      ],
      "wind_speed": null,
      "wind_degree": null,
      "wind_dir": null,
      "pressure": null,
      "precip": null,
      "humidity": null,
      "cloudcover": null,
      "feelslike": null
    }
  }
  private dummyId: string = '648099cfce24a5b1337b1028';

  constructor(private readonly weatherService: WeatherService) { }

  @WebSocketServer()
  server: Server;

  handleConnection() {
    this.sendInitialWeatherData();
    setInterval(() => {
      this.updateWeatherData();
    }, 3600000);
  }

  // 최초 실행할 코드
  private async sendInitialWeatherData() {
    try {
      let weatherData = await this.weatherService.getWeatherDataByUserId(this.dummyId);
      if (!weatherData) {
        weatherData = { ...this.initialData };
      }
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

  private emitWeatherData(weatherData: WeatherDto) {
    this.server.emit('weatherData', weatherData);
    console.log('weather', weatherData)
  }
}

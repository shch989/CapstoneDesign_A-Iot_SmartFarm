import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WeatherService } from './weather.service';

@WebSocketGateway(5000, { namespace: 'weather', cors: { origin: '*' } })
export class WeatherGateway implements OnGatewayConnection {
  private weatherData: Object = {};

  // constructor(private readonly weatherService: WeatherService) { }

  @WebSocketServer()
  server: Server;

  handleConnection() {
    this.sendInitialWeatherData();
    this.emitWeatherData()
    setInterval(() => {
      this.updateWeatherData();
      this.emitWeatherData()
    }, 360000);
  }

  // 최초 실행할 코드
  private async sendInitialWeatherData() {
    try {
      this.weatherData = {
        request: {
          type: 1,
          query: 1,
          language: 1,
          unit: 1
        },
        location: {
          name: 1,
          country: 1,
          region: 1,
          lat: 1,
          lon: 1,
          timezone_id: 1,
          localtime: 1,
          localtime_epoch: 1,
          utc_offset: 1
        },
        current: {
          observation_time: 1,
          temperature: 1,
          weather_code: 1,
          weather_icons: [
            'https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png'
          ],
          weather_descriptions: [1],
          wind_speed: 1,
          wind_degree: 1,
          wind_dir: 1,
          pressure: 1,
          precip: 1,
          humidity: 1,
          cloudcover: 1,
          feelslike: 1,
          uv_index: 1,
          visibility: 1,
          is_day: 1
        }
      }
      console.log('Initial weatherData:', this.weatherData)
    } catch (err) {
      console.error(err);
    }
  }

  // 주기적으로 실행할 코드
  private async updateWeatherData() {
    try {
      this.weatherData = {
        request: {
          type: 0,
          query: 0,
          language: 0,
          unit: 0
        },
        location: {
          name: 0,
          country: 0,
          region: 0,
          lat: 0,
          lon: 0,
          timezone_id: 0,
          localtime: 0,
          localtime_epoch: 0,
          utc_offset: 0
        },
        current: {
          observation_time: 0,
          temperature: 0,
          weather_code: 0,
          weather_icons: [
            'https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png'
          ],
          weather_descriptions: [0],
          wind_speed: 0,
          wind_degree: 0,
          wind_dir: 0,
          pressure: 0,
          precip: 0,
          humidity: 0,
          cloudcover: 0,
          feelslike: 0,
          uv_index: 0,
          visibility: 0,
          is_day: 0
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  private emitWeatherData() {
    this.server.emit('weatherData', this.weatherData);
  }
}

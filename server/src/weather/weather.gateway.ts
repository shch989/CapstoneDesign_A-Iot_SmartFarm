import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WeatherService } from './weather.service';

@WebSocketGateway(5000, { namespace: 'weather', cors: { origin: '*' } })
export class WeatherGateway implements OnGatewayConnection {
  private weatherData: Object = {
    "request": {
      "type": "LatLon",
      "query": "Lat 35.21 and Lon 129.07",
      "language": "en",
      "unit": "m"
    },
    "location": {
      "name": "Sajiktong",
      "country": "South Korea",
      "region": "",
      "lat": "35.198",
      "lon": "129.064",
      "timezone_id": "Asia/Seoul",
      "localtime": "2023-05-24 21:25",
      "localtime_epoch": 1684963500,
      "utc_offset": "9.0"
    },
    "current": {
      "observation_time": "12:25 PM",
      "temperature": 18,
      "weather_code": 113,
      "weather_icons": [
        "https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0008_clear_sky_night.png"
      ],
      "weather_descriptions": [
        "Clear"
      ],
      "wind_speed": 7,
      "wind_degree": 200,
      "wind_dir": "SSW",
      "pressure": 1016,
      "precip": 0,
      "humidity": 77,
      "cloudcover": 0,
      "feelslike": 18,
      "uv_index": 1,
      "visibility": 10,
      "is_day": "no"
    }
  };

  constructor(private readonly weatherService: WeatherService) { }

  @WebSocketServer()
  server: Server;

  handleConnection() {
    this.sendInitialWeatherData();
    setInterval(() => {
      this.updateWeatherData();
    }, 3600000); // 1시간(3600초)마다 실행
  }

  // 최초 실행할 코드
  private async sendInitialWeatherData() {
    try {
      const userId = 'your_user_id'; // 사용자 ID를 설정하세요
      const weatherData = await this.weatherService.getWeather(userId);
      this.weatherData = weatherData;
      this.server.emit('weatherData', weatherData);
      console.log('Initial weatherData:', weatherData);
    } catch (err) {
      console.error(err);
    }
  }

  // 주기적으로 실행할 코드
  private async updateWeatherData() {
    try {
      const userId = 'your_user_id'; // 사용자 ID를 설정하세요
      const weatherData = await this.weatherService.getWeather(userId);
      this.weatherData = weatherData;
      this.server.emit('weatherData', weatherData);
      console.log('Updated weatherData:', weatherData);
    } catch (err) {
      console.error(err);
    }
  }
}

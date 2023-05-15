import { HttpException, Injectable } from '@nestjs/common';
import { UserLocationDto } from './dtos/user-location.dto';
import axios from 'axios';

@Injectable()
export class GraphService {
  constructor() {}

  private readonly weatherstackApiKey = process.env.WEATHER_STACK_API_KEY;

  // 위도와 경도를 WeatherStack API를 활용하여 날씨 정보 추출
  async getWeather(userLocationDto: UserLocationDto) {
    try {
      const { lat, lng } = userLocationDto;
      const url = `http://api.weatherstack.com/current?access_key=${this.weatherstackApiKey}&query=${lat},${lng}`;
      const response = await axios.get(url);
      const data = response.data;
      return data; 
    } catch (err) {
      throw new HttpException(err, err.response.status);
    }
  }
}

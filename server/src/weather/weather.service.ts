import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { UsersRepository } from 'src/users/users.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WeatherDto } from './dtos/weather.dto';
import { Data } from 'src/users/schemas/data.schema';
import { DataDto } from 'src/users/dtos/data.dto';

@Injectable()
export class WeatherService {
  constructor(@InjectModel(Data.name) private dataModel: Model<Data>, private readonly usersRepository: UsersRepository) { }

  private readonly weatherstackApiKey = process.env.WEATHER_STACK_API_KEY;

  // weatherstack.com의 프리티어 api를 사용하여 위도와 경로에 따른 날씨 정보 출력
  async getWeather(userId: string) {
    let userData: Data | null;
    try {
      userData = await this.usersRepository.findUserByUserId(userId);
      const { lat, lng } = userData.user.location;
      const url = `http://api.weatherstack.com/current?access_key=${this.weatherstackApiKey}&query=${lat},${lng}`;
      const response = await axios.get(url);
      const data = response.data;
      return data;
    } catch (err) {
      if (!userData) {
        throw new HttpException('Not Found User.', 404);
      }
      throw new HttpException(err.message, err.status || 500);
    }
  }

  // weatherData의 초기 데이터를 내보내는 함수
  async createWeatherData(): Promise<WeatherDto> {
    const weatherData = {
      temperature: null,
      weather_descriptions: [null],
      wind_speed: null,
      wind_degree: null,
      wind_dir: null,
      pressure: null,
      precip: null,
      humidity: null,
      cloudcover: null,
      feelslike: null,
    }

    return weatherData; // 새로운 데이터 저장
  }

  // getWeather() 함수의 결과 값의 필요한 정보만을 골라내서 DB에 저장
  async saveWeatherData(id: string): Promise<DataDto> {
    const data = await this.getWeather(id);
    const userData = await this.dataModel.findById(id).exec();
    const weatherData = userData.weather

    // 데이터가 있는 경우 새로운 데이터로 수정
    weatherData.temperature = data.current.temperature;
    weatherData.weather_descriptions = data.current.weather_descriptions[0];
    weatherData.wind_speed = data.current.wind_speed;
    weatherData.wind_degree = data.current.wind_degree;
    weatherData.wind_dir = data.current.wind_dir;
    weatherData.pressure = data.current.pressure;
    weatherData.precip = data.current.precip;
    weatherData.humidity = data.current.humidity;
    weatherData.cloudcover = data.current.cloudcover;
    weatherData.feelslike = data.current.feelslike;

    return await userData.save();
  }

  // 유저 Id를 통해 날씨 정보를 DB에서 가져옴
  async getWeatherDataByUserId(id: string): Promise<DataDto> {
    const weatherData = await this.dataModel.findById(id).exec();
    return weatherData;
  }
}

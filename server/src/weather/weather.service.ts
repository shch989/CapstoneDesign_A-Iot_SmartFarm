import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { User } from 'src/users/schemas/users.schema';
import { UsersRepository } from 'src/users/users.repository';
import { Weather } from './schemas/weather.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WeatherDto } from './dtos/weather.dto';

@Injectable()
export class WeatherService {
  constructor(@InjectModel(Weather.name) private weatherModel: Model<Weather>, private readonly usersRepository: UsersRepository) { }

  private readonly weatherstackApiKey = process.env.WEATHER_STACK_API_KEY;

  // weatherstack.com의 프리티어 api를 사용하여 위도와 경로에 따른 날씨 정보 출력
  async getWeather(userId: string) {
    let user: User | null;
    try {
      user = await this.usersRepository.findUserByUserId(userId);
      const { lat, lng } = user.location;
      const url = `http://api.weatherstack.com/current?access_key=${this.weatherstackApiKey}&query=${lat},${lng}`;
      const response = await axios.get(url);
      const data = response.data;
      return data;
    } catch (err) {
      if (!user) {
        throw new HttpException('Not Found User.', 404);
      }
      throw new HttpException(err.message, err.status || 500);
    }
  }

  async createWeatherData(userId: string): Promise<WeatherDto> {
    const data = await this.getWeather(userId);
    const { address } = await this.usersRepository.findUserByUserId(userId);
    // 데이터가 없는 경우 새로 생성하여 저장
    const newWeatherData = new this.weatherModel({
      userId,
      location: {
        country: address
      },
      current: {
        temperature: data.current.temperature,
        weather_descriptions: data.current.weather_descriptions[0],
        wind_speed: data.current.wind_speed,
        wind_degree: data.current.wind_degree,
        wind_dir: data.current.wind_dir,
        pressure: data.current.pressure,
        precip: data.current.precip,
        humidity: data.current.humidity,
        cloudcover: data.current.cloudcover,
        feelslike: data.current.feelslike,
      }
    });

    return newWeatherData.save(); // 새로운 데이터 저장

  }

  // getWeather() 함수의 결과 값의 필요한 정보만을 골라내서 DB에 저장
  async saveWeatherData(userId: string): Promise<WeatherDto> {
    const data = await this.getWeather(userId);
    const { address } = await this.usersRepository.findUserByUserId(userId);
    const weatherData = await this.weatherModel.findOne({ userId });

    // 데이터가 있는 경우 새로운 데이터로 수정
    weatherData.location.country = address;
    weatherData.current.temperature = data.current.temperature;
    weatherData.current.weather_descriptions = data.current.weather_descriptions[0];
    weatherData.current.wind_speed = data.current.wind_speed;
    weatherData.current.wind_degree = data.current.wind_degree;
    weatherData.current.wind_dir = data.current.wind_dir;
    weatherData.current.pressure = data.current.pressure;
    weatherData.current.precip = data.current.precip;
    weatherData.current.humidity = data.current.humidity;
    weatherData.current.cloudcover = data.current.cloudcover;
    weatherData.current.feelslike = data.current.feelslike;

    await weatherData.save(); // 수정된 데이터를 저장

    return weatherData;
  }

  // 유저 Id를 통해 날씨 정보를 DB에서 가져옴
  async getWeatherDataByUserId(userId: string): Promise<WeatherDto> {
    const weatherData = await this.weatherModel.findOne({ userId });
    if (!weatherData) {
      const createData = await this.createWeatherData(userId);
      return createData
    }
    return weatherData;
  }
}

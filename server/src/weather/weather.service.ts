import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { User } from 'src/users/schemas/users.schema';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class WeatherService {
  constructor(private readonly usersRepository: UsersRepository) { }

  private readonly weatherstackApiKey = process.env.WEATHER_STACK_API_KEY;

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
}

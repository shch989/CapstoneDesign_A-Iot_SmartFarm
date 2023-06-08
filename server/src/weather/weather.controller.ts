import { Controller, Get, NotFoundException, Param, UseInterceptors } from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @UseInterceptors(SuccessInterceptor)
  @Get('/:userId')
  async getWeather(@Param('userId') userId: string) {
    const weather = await this.weatherService.getWeather(userId);
    return weather;
  }

  @UseInterceptors(SuccessInterceptor)
  @Get('/:userId/save')
  async saveWeatherData(@Param('userId') userId: string) {
    const weather = await this.weatherService.saveWeatherData(userId);
    return weather;
  }

  @UseInterceptors(SuccessInterceptor)
  @Get('/:userId/get')
  async getWeatherData(@Param('userId') userId: string) {
    const weather = await this.weatherService.getWeatherDataByUserId(userId);
    return weather;
  }
}

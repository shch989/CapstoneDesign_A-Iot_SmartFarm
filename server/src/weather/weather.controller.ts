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

  @Get('/precip/:userId')
  async getPrecip(@Param('userId') userId: string) {
    const precip = await this.weatherService.getWeatherPrecip(userId);
    return precip
  }

  @Get('/temperature/:userId')
  async getTemperature(@Param('userId') userId: string) {
    const temperature = await this.weatherService.getWeatherTemperature(userId);
    return temperature
  }

  @Get('/humidity/:userId')
  async getHumidity(@Param('userId') userId: string) {
    const humidity = await this.weatherService.getWeatherHumidity(userId);
    return humidity
  }
}

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
}

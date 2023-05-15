import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { GraphService } from './graph.service';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@Controller('graph')
export class GraphController {
  constructor(
    private readonly authService: AuthService,
    private readonly graphService: GraphService,
  ) {}
  // 테스트용
  @Post('weather')
  async testWeather(@Body('address') address: string) {
    const response = await this.authService.getLatLng(address);
    const weather = await this.graphService.getWeather(response);
    return weather;
  }

  @UseInterceptors(SuccessInterceptor)
  @Get('weather/:userId')
  async getWeather(@Param('userId') userId: string) {
    const userData = await this.authService.findUserData(userId);
    const userLocation = userData.location;
    const userWeather = await this.graphService.getWeather(userLocation);
    return userWeather;
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('location')
  async getLatLng(@Body('address') address: string) {
    const location = await this.authService.getLatLng(address);
    return location;
  }

  @Post('weather')
  async getWeather(@Body('address') address: string) {
    const weather = await this.authService.getWeather(address);
    return weather;
  }
}

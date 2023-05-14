import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register-auth.dto';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 테스트용
  @Post('location')
  async getLatLng(@Body('address') address: string) {
    const location = await this.authService.getLatLng(address);
    return location;
  }

  // 테스트용
  @Post('weather')
  async getWeather(@Body('address') address: string) {
    const weather = await this.authService.getWeather(address);
    return weather;
  }

  // 테스트용
  @Post('hash')
  async getPassword(@Body('password') password: string) {
    const hashed = await this.authService.hashPassword(password);
    return hashed;
  }

  @UseInterceptors(SuccessInterceptor)
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    const createdUser = await this.authService.createUser(registerUserDto);
    return createdUser;
  }
}

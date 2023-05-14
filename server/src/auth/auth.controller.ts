import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from './dtos/user-register.dto';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 테스트용
  @Post('location')
  async testLatLng(@Body('address') address: string) {
    const location = await this.authService.getLatLng(address);
    return location;
  }

  // 테스트용
  @Post('weather')
  async testWeather(@Body('address') address: string) {
    const response = await this.authService.getLatLng(address);
    const weather = await this.authService.getWeather(response);
    return weather;
  }

  // 테스트용
  @Post('hash')
  async testPassword(@Body('password') password: string) {
    const hashed = await this.authService.hashPassword(password);
    return hashed;
  }

  @UseInterceptors(SuccessInterceptor)
  @Post('register')
  async register(@Body() registerUserDto: UserRegisterDto) {
    const createdUser = await this.authService.createUser(registerUserDto);
    return createdUser;
  }

  @UseInterceptors(SuccessInterceptor)
  @Get('weather/:userId')
  async getWeather(@Param('userId') userId: string) {
    const userData = await this.authService.findUserData(userId)
    const userLocation = userData.location
    const userWeather = await this.authService.getWeather(userLocation);
    return userWeather;
  }
}

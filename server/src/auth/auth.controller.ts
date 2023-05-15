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
}

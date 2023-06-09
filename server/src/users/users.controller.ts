import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRegisterDto } from 'src/users/dtos/user-register.dto';
import { UserLoginDto } from './dtos/user-login.dto';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {}

  @UseInterceptors(SuccessInterceptor)
  @Post('register')
  async register(@Body() registerUserDto: UserRegisterDto) {
    const createdUser = await this.usersService.createUser(registerUserDto);
    return createdUser;
  }

  @UseInterceptors(SuccessInterceptor)
  @Post('login')
  async login(@Body() loginUserDto: UserLoginDto) {
    const loginedUser = await this.authService.jwtLogIn(loginUserDto);
    return loginedUser;
  }
}

import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRegisterDto } from 'src/users/dtos/user-register.dto';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(SuccessInterceptor)
  @Post('register')
  async register(@Body() registerUserDto: UserRegisterDto) {
    const createdUser = await this.usersService.createUser(registerUserDto);
    return createdUser;
  }
}

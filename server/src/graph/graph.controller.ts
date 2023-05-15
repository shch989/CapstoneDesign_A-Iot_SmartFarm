import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { GraphService } from './graph.service';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/users.repository';

@Controller('graph')
export class GraphController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @UseInterceptors(SuccessInterceptor)
  @Get('weather/:userId')
  async getWeather(@Param('userId') userId: string) {
    // const user = await this.usersRepository.findUserByUserId(userId);
    // if (!user) {
    //   throw new HttpException('User not found', 404);
    // }
    // const location = user.location;
    // const weather = await this.graphService.getWeather(location);
    // return weather;
  }
}

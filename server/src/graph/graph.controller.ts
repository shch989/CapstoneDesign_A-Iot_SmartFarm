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

@Controller('graph')
export class GraphController {
  constructor(
    private readonly graphService: GraphService,
  ) {}

  @UseInterceptors(SuccessInterceptor)
  @Get('weather/:userId')
  async getWeather(@Param('userId') userId: string) {
    const weather = await this.graphService.getWeather(userId);
    return weather;
  }
}

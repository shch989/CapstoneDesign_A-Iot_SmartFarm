import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { UsersModule } from 'src/users/users.module';
import { WeatherGateway } from './weather.gateway';

@Module({
  imports: [UsersModule],
  providers: [WeatherService, WeatherGateway],
  controllers: [WeatherController]
})
export class WeatherModule {}

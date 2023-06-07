import { Module, forwardRef } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { UsersModule } from 'src/users/users.module';
import { WeatherGateway } from './weather.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Weather, WeatherSchema } from './schemas/weather.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Weather.name, schema: WeatherSchema }]), forwardRef(() => UsersModule)],
  providers: [WeatherService, WeatherGateway],
  controllers: [WeatherController],
  exports: [WeatherService]
})
export class WeatherModule { }

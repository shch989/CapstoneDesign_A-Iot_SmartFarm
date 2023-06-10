import { Module, forwardRef } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { UsersModule } from 'src/users/users.module';
import { WeatherGateway } from './weather.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Data, DataSchema } from 'src/users/schemas/data.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: Data.name, schema: DataSchema }]), forwardRef(() => UsersModule), JwtModule.register({})],
  providers: [WeatherService, WeatherGateway],
  controllers: [WeatherController],
  exports: [WeatherService]
})
export class WeatherModule { }

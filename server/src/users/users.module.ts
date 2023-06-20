import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/users.schema';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from 'src/auth/auth.module';
import { UsersRepository } from './users.repository';
import { DhtModule } from 'src/dht/dht.module';
import { WeatherModule } from 'src/weather/weather.module';
import { Data, DataSchema } from './schemas/data.schema';
import { CctvModule } from 'src/cctv/cctv.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Data.name, schema: DataSchema }]),
    HttpModule,
    forwardRef(() => AuthModule),
    DhtModule,
    forwardRef(() => WeatherModule),
    forwardRef(() => CctvModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule { }

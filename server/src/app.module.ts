import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DhtModule } from './dht/dht.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WeatherModule } from './weather/weather.module';
import { FanModule } from './fan/fan.module';
import { MotorModule } from './motor/motor.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    DhtModule,
    UsersModule,
    AuthModule,
    WeatherModule,
    FanModule,
    MotorModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

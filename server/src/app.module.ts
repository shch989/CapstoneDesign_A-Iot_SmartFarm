import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DhtModule } from './dht/dht.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), DhtModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

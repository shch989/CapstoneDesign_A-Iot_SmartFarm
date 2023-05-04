import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DhtModule } from './dht/dht.module';

@Module({
  imports: [DhtModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

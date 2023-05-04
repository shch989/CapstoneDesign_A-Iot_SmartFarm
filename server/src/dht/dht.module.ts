import { Module } from '@nestjs/common';
import { DhtGateway } from './dht.gateway';
import { DhtService } from './dht.service';

@Module({
  providers: [DhtGateway, DhtService]
})
export class DhtModule {}

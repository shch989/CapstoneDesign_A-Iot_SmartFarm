import { Module } from '@nestjs/common';
import { DhtService } from './dht.service';
import { DhtController } from './dht.controller';
import { DhtGateway } from './dht.gateway';


@Module({
  imports: [],
  providers: [DhtService, DhtGateway],
  controllers: [DhtController]
})
export class DhtModule { }

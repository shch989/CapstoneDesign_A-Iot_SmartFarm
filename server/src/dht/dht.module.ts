import { Module, forwardRef } from '@nestjs/common';
import { DhtService } from './dht.service';
import { DhtController } from './dht.controller';
import { DhtGateway } from './dht.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Dht, DhtSchema } from './schemas/dht.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: Dht.name, schema: DhtSchema }])],
  providers: [DhtService, DhtGateway],
  controllers: [DhtController],
  exports: [DhtService]
})
export class DhtModule { }

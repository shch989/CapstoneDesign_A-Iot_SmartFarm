import { Module, forwardRef } from '@nestjs/common';
import { DhtService } from './dht.service';
import { DhtController } from './dht.controller';
import { DhtGateway } from './dht.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Data, DataSchema } from 'src/users/schemas/data.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: Data.name, schema: DataSchema }]), JwtModule.register({})],
  providers: [DhtService, DhtGateway],
  controllers: [DhtController],
  exports: [DhtService]
})
export class DhtModule { }

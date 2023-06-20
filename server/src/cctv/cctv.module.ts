import { Module, forwardRef } from '@nestjs/common';
import { CctvController } from './cctv.controller';
import { CctvService } from './cctv.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { Data, DataSchema } from 'src/users/schemas/data.schema';
import { CctvGateway } from './cctv.gateway';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Data.name, schema: DataSchema }]),
    forwardRef(() => UsersModule),
    JwtModule
  ],
  controllers: [CctvController],
  providers: [CctvService, CctvGateway],
  exports: [CctvService],
})
export class CctvModule { }
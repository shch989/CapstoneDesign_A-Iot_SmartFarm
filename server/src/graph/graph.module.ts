import { Module } from '@nestjs/common';
import { GraphService } from './graph.service';
import { GraphController } from './graph.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [GraphService],
  controllers: [GraphController]
})
export class GraphModule {}

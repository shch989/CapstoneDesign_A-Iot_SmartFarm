import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Dht extends Document {
  @Prop([Number])
  humidity: number[];

  @Prop([Number])
  temperature: number[];
}

export const DhtSchema = SchemaFactory.createForClass(Dht);

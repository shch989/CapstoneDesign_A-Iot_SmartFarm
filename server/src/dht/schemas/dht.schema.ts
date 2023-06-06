import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Dht extends Document {
  @Prop({ required: true, unique: true, ref: 'User' })
  id: string;

  @Prop([Number])
  humidity: number[];

  @Prop([Number])
  temperature: number[];
}

export const DhtSchema = SchemaFactory.createForClass(Dht);
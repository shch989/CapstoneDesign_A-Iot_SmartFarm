import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User, UserSchema } from './users.schema';
import { Weather, WeatherSchema } from 'src/weather/schemas/weather.schema';
import { Dht, DhtSchema } from 'src/dht/schemas/dht.schema';

@Schema()
export class Data extends Document {
  @Prop({
    required: true,
    type: UserSchema,
  })
  user: User;

  @Prop({
    required: true,
    type: WeatherSchema,
  })
  weather: Weather;

  @Prop({
    required: true,
    type: DhtSchema,
  })
  sensor: Dht;
}

export const DataSchema = SchemaFactory.createForClass(Data);
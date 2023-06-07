import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Location {
  @Prop({ required: true })
  country: string;
}

@Schema({ _id: false })
export class Current {
  @Prop({ required: true })
  temperature: number;

  @Prop({ required: true })
  weather_descriptions: string[];

  @Prop({ required: true })
  wind_speed: number;

  @Prop({ required: true })
  wind_degree: number;

  @Prop({ required: true })
  wind_dir: string;

  @Prop({ required: true })
  pressure: number;

  @Prop({ required: true })
  precip: number;

  @Prop({ required: true })
  humidity: number;

  @Prop({ required: true })
  cloudcover: number;

  @Prop({ required: true })
  feelslike: number;
}

@Schema()
export class Weather extends Document {
  @Prop({ required: true, unique: true, ref: 'User' })
  userId: string;

  @Prop({ type: Location, required: true })
  location: Location;

  @Prop({ type: Current, required: true })
  current: Current;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Weather extends Document {

  @Prop()
  temperature: number;

  @Prop()
  weather_descriptions: string[];

  @Prop()
  wind_speed: number;

  @Prop()
  wind_degree: number;

  @Prop()
  wind_dir: string;

  @Prop()
  pressure: number;

  @Prop()
  precip: number;

  @Prop()
  humidity: number;

  @Prop()
  cloudcover: number;

  @Prop()
  feelslike: number;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);

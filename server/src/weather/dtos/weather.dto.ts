import { PickType } from '@nestjs/swagger';
import { Weather } from '../schemas/weather.schema';

export class WeatherDto extends PickType(Weather, [
  'location',
  'current'
] as const) { }
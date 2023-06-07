import { PickType } from '@nestjs/swagger';
import { Weather } from '../schemas/weather.schema';

export class WeatherDto extends PickType(Weather, [
  'id',
  'location',
  'current'
] as const) { }
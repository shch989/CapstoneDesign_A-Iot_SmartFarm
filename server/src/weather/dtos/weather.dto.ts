import { PartialType } from '@nestjs/swagger';
import { Weather } from '../schemas/weather.schema';

export class WeatherDto extends PartialType(Weather) { }
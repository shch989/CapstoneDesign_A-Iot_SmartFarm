import { PickType } from '@nestjs/swagger';
import { Dht } from '../schemas/dht.schema';

export class DhtSensorDto extends PickType(Dht, [
  'id',
  'temperature',
  'humidity'
] as const) { }
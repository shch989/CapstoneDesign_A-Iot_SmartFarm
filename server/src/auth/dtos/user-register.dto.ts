import { PickType } from '@nestjs/swagger';
import { User } from '../users.schema';

export class UserRegisterDto extends PickType(User, [
  'name',
  'email',
  'password',
  'address',
] as const) {}

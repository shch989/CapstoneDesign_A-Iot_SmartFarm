import { PickType } from '@nestjs/swagger';
import { User } from '../schemas/users.schema';

export class UserLoginDto extends PickType(User, [
  'email',
  'password',
] as const) {}

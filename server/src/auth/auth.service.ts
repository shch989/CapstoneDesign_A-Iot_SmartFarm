import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from 'src/users/dtos/user-login.dto';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  // Bcrypt를 사용한 비밀번호 해쉬화
  async hashPassword(password: string) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

  async jwtLogIn(data: UserLoginDto) {
    const { email, password } = data;
    const userData = await this.usersRepository.findUserByEmail(email);
    if (!userData) {
      throw new HttpException('Check your email and password', 401);
    }
    const isPasswordValidated = await bcrypt.compare(password, userData.user.password);
    if (!isPasswordValidated) {
      throw new HttpException('Check your email and password', 401);
    }
    const payload = { email: email, sub: userData.id };
    return {
      access_token: this.jwtService.signAsync(payload),
    };
  }
}

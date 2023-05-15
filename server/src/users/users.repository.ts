import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import { Model } from 'mongoose';
import { UsersModule } from './users.module';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findUserByUserId(userId: string) {
    const user = await this.userModel.findById(userId).exec();
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async existsByEmail(email: string) {
    const result = await this.userModel.exists({ email });
    return result;
  }

  async create(user: User) {
    return await this.userModel.create(user);
  }
}

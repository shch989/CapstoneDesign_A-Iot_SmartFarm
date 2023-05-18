import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findUserByUserId(
    userId: string | Types.ObjectId,
  ): Promise<User | null> {
    const user = await this.userModel.findById(userId).exec();
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.userModel.countDocuments({ email });
    return result > 0;
  }

  async create(user: User): Promise<User> {
    return await this.userModel.create(user);
  }
}

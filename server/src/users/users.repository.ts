import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import { Model, Types } from 'mongoose';
import { Data } from './schemas/data.schema';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(Data.name) private readonly dataModel: Model<Data>,
  ) {}

  async findUserByUserId(
    userId: string | Types.ObjectId,
  ): Promise<Data | null> {
    const user = await this.dataModel.findById(userId).exec();
    return user;
  }

  async findUserByEmail(email: string): Promise<Data | null> {
    const user = await this.dataModel.findOne({ email });
    return user;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.dataModel.countDocuments({ email });
    return result > 0;
  }

  async create(user: User): Promise<Data> {
    return await this.dataModel.create(user);
  }
}

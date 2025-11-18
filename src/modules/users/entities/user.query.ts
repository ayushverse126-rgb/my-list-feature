import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { User, UserSchema } from './user.entity';

@Injectable()
export class UserQuery {
  private readonly userModel: mongoose.Model<any>;

  constructor() {
    this.userModel = mongoose.model('User', UserSchema);
  }

  async addUser(values: Partial<User>): Promise<void> {
    return this.userModel.create(values);
  }

  async fetchUser(where: any, attributes?: string[]): Promise<User> {
    return this.userModel
      .findOne(where)
      .select(attributes ? attributes.join(' ') : '')
      .lean()
      .exec() as unknown as User;
  }
}

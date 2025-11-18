import { Injectable } from '@nestjs/common';
import mongoose, { UpdateQuery } from 'mongoose';
import { MyList, MyListSchema } from './myListSchema.entity';

@Injectable()
export class MyListSchemaQuery {
  private readonly myListSchemaModel: mongoose.Model<any>;

  constructor() {
    this.myListSchemaModel = mongoose.model('MyListSchema', MyListSchema);
  }

  async updateMyListSchemaByWhere(
    where: any,
    update: UpdateQuery<MyList>,
  ): Promise<mongoose.UpdateWriteOpResult> {
    return this.myListSchemaModel
      .updateOne(where, update, { upsert: true })
      .exec();
  }

  async addToMyListSchema(values: Partial<MyList>): Promise<void> {
    return this.myListSchemaModel.create(values);
  }

  async fetchMyListSchema(
    where: any,
    attributes?: string[],
  ): Promise<MyList[]> {
    const result = (await this.myListSchemaModel
      .find(where)
      .select(attributes ? attributes.join(' ') : '')
      .lean()
      .exec()) as unknown as MyList[];

    return result as unknown as MyList[];
  }
}

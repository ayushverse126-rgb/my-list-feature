import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { MyListSchemaQuery } from '../../entities/myListSchema.query';
import { RedisClientType } from 'redis';

@Injectable()
export class RemoveMyListHelper {
  @Inject()
  private readonly myListSchemaQuery: MyListSchemaQuery;

  @Inject('REDIS') private redis: RedisClientType;

  async removeFromMyList(userId: string, itemId: string): Promise<void> {
    try {
      await this.myListSchemaQuery.updateMyListSchemaByWhere(
        {
          userId,
          itemId,
        },
        {
          $set: {
            isRemoved: true,
          },
        },
      );

      // we can either call a queue to remove this item from redis
      await this.redis.del(`${userId}_list`);
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }
}

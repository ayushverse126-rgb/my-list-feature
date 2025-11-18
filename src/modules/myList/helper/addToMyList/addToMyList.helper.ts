import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UpdateMyListDTO } from '../../dto/updateList.dto';
import { MyListSchemaQuery } from '../../entities/myListSchema.query';
import { MyList } from '../../entities/myListSchema.entity';
import { RedisClientType } from 'redis';

@Injectable()
export class AddToMyListHelper {
  @Inject()
  private readonly myListSchemaQuery: MyListSchemaQuery;

  @Inject('REDIS') private redis: RedisClientType;

  async addToMyList(userId: string, updateMyList: UpdateMyListDTO) {
    try {
      await this.myListSchemaQuery.updateMyListSchemaByWhere(
        { ...updateMyList, userId },
        {
          $set: {
            isRemoved: false,
          },
        },
      );

      // we can either call a queue to add new item to redis
      await this.redis.del(`${userId}_list`);
    } catch (error) {
      if (error.code === 11000) {
        console.log('Record already exists');
      }
      throw new UnprocessableEntityException(error.message);
    }
  }
}

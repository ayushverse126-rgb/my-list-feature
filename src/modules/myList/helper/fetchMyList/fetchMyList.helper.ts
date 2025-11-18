import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from "@nestjs/common";
import { RedisClientType } from "redis";
import { MyListSchemaQuery } from "../../entities/myListSchema.query";
import { MyList } from "../../entities/myListSchema.entity";
import { FetchItemsHelper } from "../../../items/helper/fetchItems.helper";
import { FetchListDTO } from "../../dto/fetchList.dto";

@Injectable()
export class FetchMyListHelper {
  @Inject()
  private readonly myListSchemaQuery: MyListSchemaQuery;

  @Inject()
  private readonly fetchItemsHelper: FetchItemsHelper;

  @Inject("REDIS") private redis: RedisClientType;

  async fetchMyList(userId: string, query: FetchListDTO): Promise<MyList[]> {
    const userExistingList = await this.redis.get(`${userId}_list`);

    if (userExistingList)
      return JSON.parse(userExistingList).slice(
        query?.offset,
        query?.offset + query?.limit
      );

    try {
      const userLists = await this.myListSchemaQuery.fetchMyListSchema(
        {
          userId,
          isRemoved: false,
        },
        ["genre", "itemId", "itemType"]
      );

      for (const data of userLists) {
        const itemData = await this.fetchItemsHelper.fetchItemDetails(
          data?.itemId,
          data?.itemType
        );
        data["itemData"] = itemData;
      }
      console.log("set to redis");
      await this.redis.set(`${userId}_list`, JSON.stringify(userLists));
      return userLists.slice(query?.offset, query?.offset + query?.limit);
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }
}

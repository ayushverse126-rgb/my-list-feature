import { Injectable } from '@nestjs/common';
import { UpdateMyListDTO } from './dto/updateList.dto';
import { RemoveListDTO } from './dto/removeList.dto';
import { MyList } from './entities/myListSchema.entity';
import { AddDataHelper } from './helper/addData.helper';
import { AddToMyListHelper } from './helper/addToMyList/addToMyList.helper';
import { RemoveMyListHelper } from './helper/removeMyList/removeMyList.helper';
import { FetchMyListHelper } from './helper/fetchMyList/fetchMyList.helper';

@Injectable()
export class MyListService {
  constructor(
    private readonly addToListHelper: AddToMyListHelper,
    private readonly removeMyListHelper: RemoveMyListHelper,
    private readonly fetchMyListHelper: FetchMyListHelper,
    private readonly addDataHelper: AddDataHelper,
  ) {}

  async getMyList(userId: string): Promise<MyList[]> {
    return this.fetchMyListHelper.fetchMyList(userId);
  }

  async removeFromMyList(params: RemoveListDTO, userId: string) {
    await this.removeMyListHelper.removeFromMyList(userId, params.itemId);
  }

  async addToMyList(
    userId: string,
    updateMyListDto: UpdateMyListDTO,
  ): Promise<void> {
    await this.addToListHelper.addToMyList(userId, updateMyListDto);
  }

  async addData() {
    await this.addDataHelper.addData();
  }
}

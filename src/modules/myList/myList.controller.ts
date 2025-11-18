import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { UpdateMyListDTO } from './dto/updateList.dto';
import { RemoveListDTO } from './dto/removeList.dto';
import { FetchListDTO } from './dto/fetchList.dto';
import { UserData } from '../../generics/decorators/request.decorator';
import { MyListService } from './myList.service';
import { MyList } from './entities/myListSchema.entity';

@Controller({
  version: VERSION_NEUTRAL,
  path: 'my-list',
})
export class MyListController {
  constructor(private readonly myListService: MyListService) {}

  @Get()
  getMyList(
    @UserData('userId') userId: string,
    @Query() query: FetchListDTO): Promise<MyList[]> {
    return this.myListService.getMyList(userId,query);
  }

  @Put('remove/:itemId')
  removeFromMyList(
    @Param() params: RemoveListDTO,
    @UserData('userId') userId: string,
  ) {
    return this.myListService.removeFromMyList(params, userId);
  }

  @Post()
  addToMyList(
    @UserData('userId') userId: string,
    @Body() updateMyListDto: UpdateMyListDTO,
  ) {
    return this.myListService.addToMyList(userId, updateMyListDto);
  }
}

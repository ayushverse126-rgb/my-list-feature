import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { UserData } from '../../generics/decorators/request.decorator';
import { MyListService } from './myList.service';
import { UpdateMyListDTO } from './dto/updateList.dto';
import { RemoveListDTO } from './dto/removeList.dto';
import { MyList } from './entities/myListSchema.entity';

@Controller({
  version: VERSION_NEUTRAL,
  path: 'my-list',
})
export class MyListController {
  constructor(private readonly myListService: MyListService) {}

  @Get()
  getMyList(@UserData('userId') userId: string): Promise<MyList[]> {
    return this.myListService.getMyList(userId);
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

  @Post('add-data')
  addData() {
    return this.myListService.addData();
  }
}

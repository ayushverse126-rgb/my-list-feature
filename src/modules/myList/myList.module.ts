import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { ItemsModule } from '../items/items.module';
import { MyListSchemaQuery } from './entities/myListSchema.query';
import { MyListController } from './myList.controller';
import { MyListService } from './myList.service';
import { AddToMyListHelper } from './helper/addToMyList/addToMyList.helper';
import { AddDataHelper } from './helper/addData.helper';
import { RemoveMyListHelper } from './helper/removeMyList/removeMyList.helper';
import { FetchMyListHelper } from './helper/fetchMyList/fetchMyList.helper';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'mysecret',
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule,
    ItemsModule,
  ],
  controllers: [MyListController],
  providers: [
    MyListService,
    MyListSchemaQuery,
    AddToMyListHelper,
    AddDataHelper,
    RemoveMyListHelper,
    FetchMyListHelper,
  ],
})
export class MyListModule {}

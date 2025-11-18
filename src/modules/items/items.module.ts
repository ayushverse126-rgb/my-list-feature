import { Module } from '@nestjs/common';
import { TVShowQuery } from './entities/tvShow.query';
import { MovieQuery } from './entities/movie.query';
import { FetchItemsHelper } from './helper/fetchItems.helper';

@Module({
  imports: [],
  controllers: [],
  providers: [MovieQuery, TVShowQuery, FetchItemsHelper],
  exports: [MovieQuery, TVShowQuery, FetchItemsHelper],
})
export class ItemsModule {}

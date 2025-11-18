import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { MovieQuery } from '../entities/movie.query';
import { TVShowQuery } from '../entities/tvShow.query';
import { Movie } from '../entities/movie.entity';
import { TVShow } from '../entities/tvShow.entity';

@Injectable()
export class FetchItemsHelper {
  constructor(
    private readonly movieQuery: MovieQuery,
    private readonly tvShowQuery: TVShowQuery,
  ) {}

  async fetchItemDetails(
    itemId: string,
    itemType: string,
  ): Promise<TVShow | Movie> {
    try {
      if (itemType === 'movie') {
        return await this.movieQuery.fetchMovie(
          {
            id: itemId,
          },
          [
            'title',
            'description',
            'genres',
            'releaseDate',
            'director',
            'actors',
          ],
        );
      } else {
        return await this.tvShowQuery.fetchTVShow(
          {
            id: itemId,
          },
          [
            'title',
            'description',
            'genres',
            'releaseDate',
            'director',
            'actors',
          ],
        );
      }
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }
}

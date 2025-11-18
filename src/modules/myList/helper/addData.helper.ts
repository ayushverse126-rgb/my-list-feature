import { Injectable } from '@nestjs/common';
import { UserQuery } from '../../users/entities/user.query';
import { GenreEnums } from '../entities/myListSchema.entity';
import { MovieQuery } from '../../items/entities/movie.query';
import { TVShowQuery } from '../../items/entities/tvShow.query';

@Injectable()
export class AddDataHelper {
  constructor(
    private readonly movieQuery: MovieQuery,
    private readonly tvShowQuery: TVShowQuery,
    private readonly userQuery: UserQuery,
  ) {}

  async addData() {
    // await this.movieQuery.addMovie({
    //   id: 'MOV1',
    //   title: 'Interstellar',
    //   description:
    //     'A space crew travels through a wormhole in search of a new home for humanity.',
    //   genres: [GenreEnums.SciFi, GenreEnums.Drama],
    //   releaseDate: new Date('2014-11-07'),
    //   director: 'Christopher Nolan',
    //   actors: ['Matthew McConaughey', 'Anne Hathaway'],
    // });

    await this.tvShowQuery.addTVShow({
      id: 'TV2',
      title: 'Stranger Things',
      description:
        'A group of kids uncover supernatural mysteries in their town.',
      genres: [GenreEnums.Fantasy, GenreEnums.Drama, GenreEnums.SciFi],
      episodes: [
        {
          episodeNumber: 1,
          seasonNumber: 1,
          releaseDate: new Date('2016-07-15'),
          director: 'The Duffer Brothers',
          actors: ['Millie Bobby Brown', 'Finn Wolfhard'],
        },
        {
          episodeNumber: 2,
          seasonNumber: 1,
          releaseDate: new Date('2016-07-15'),
          director: 'The Duffer Brothers',
          actors: ['David Harbour', 'Winona Ryder'],
        },
      ],
    });

    await this.userQuery.addUser({
      id: 'U2',
      username: 'tina',
      preferences: {
        favoriteGenres: [GenreEnums.Romance, GenreEnums.Comedy],
        dislikedGenres: [GenreEnums.SciFi],
      },
      watchHistory: [
        {
          contentId: 'MOV2',
          watchedOn: new Date('2025-11-12'),
          rating: 10,
        },
      ],
    });
    return {
      message: 'My List updated successfully',
    };
  }
}

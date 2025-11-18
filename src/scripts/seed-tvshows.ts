import mongoose from 'mongoose';
import { connectDB } from './db';
import { TVShowSchema } from '../modules/items/entities/tvShow.entity';
import { GenreEnums } from "../modules/myList/entities/myListSchema.entity";


async function seedTVShows() {
  await connectDB();

  const TVShow = mongoose.model('TVShow', TVShowSchema);

  const shows = [
    {
      id: 'TV1',
      title: 'Breaking Bad',
      description: 'A chemistry teacher turns to crime.',
      genres: [GenreEnums.Drama],
      episodes: [
        {
          episodeNumber: 1,
          seasonNumber: 1,
          releaseDate: new Date('2008-01-20'),
          director: 'Vince Gilligan',
          actors: ['Bryan Cranston', 'Aaron Paul']
        }
      ]
    },
    {
      id: 'TV2',
      title: 'Money Heist',
      description: 'A group attempts the biggest robbery in history.',
      genres: [GenreEnums.Action, GenreEnums.Drama],
      episodes: [
        {
          episodeNumber: 1,
          seasonNumber: 1,
          releaseDate: new Date('2017-05-02'),
          director: 'Álex Pina',
          actors: ['Úrsula Corberó', 'Álvaro Morte']
        }
      ]
    }
  ];

  await TVShow.insertMany(shows);
  console.log('TV Shows seeded');
  process.exit(0);
}

seedTVShows();

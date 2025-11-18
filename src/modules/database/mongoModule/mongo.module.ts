import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoService } from './mongo.service';
import { MyListSchema } from '../../myList/entities/myListSchema.entity';
import { MovieSchema } from '../../items/entities/movie.entity';
import { TVShowSchema } from '../../items/entities/tvShow.entity';
import { UserSchema } from '../../users/entities/user.entity';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI,
        minPoolSize: 10,
        maxPoolSize: 100,
      }),
      inject: [],
    }),
    MongooseModule.forFeature([{ name: 'MyList', schema: MyListSchema }]),
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]),
    MongooseModule.forFeature([{ name: 'TVShow', schema: TVShowSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [MongoService],
  exports: [MongoService],
})
export class MongoModule {}

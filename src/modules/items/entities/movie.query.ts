import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { Movie, MovieSchema } from './movie.entity';

@Injectable()
export class MovieQuery {
  private readonly movieModel: mongoose.Model<any>;

  constructor() {
    this.movieModel = mongoose.model('Movie', MovieSchema);
  }

  async addMovie(values: Partial<Movie>): Promise<void> {
    return this.movieModel.create(values);
  }

  async fetchMovie(where: any, attributes?: string[]): Promise<Movie> {
    return this.movieModel
      .findOne(where)
      .select(attributes ? attributes.join(' ') : '')
      .lean()
      .exec() as unknown as Movie;
  }
}

import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { TVShowSchema } from './tvShow.entity';
import { TVShow } from './tvShow.entity';

@Injectable()
export class TVShowQuery {
  private readonly tvShowModel: mongoose.Model<any>;

  constructor() {
    this.tvShowModel = mongoose.model('TVShow', TVShowSchema);
  }

  async addTVShow(values: Partial<TVShow>): Promise<void> {
    return this.tvShowModel.create(values);
  }

  async fetchTVShow(where: any, attributes?: string[]): Promise<TVShow> {
    return this.tvShowModel
      .findOne(where)
      .select(attributes ? attributes.join(' ') : '')
      .lean()
      .exec() as unknown as TVShow;
  }
}

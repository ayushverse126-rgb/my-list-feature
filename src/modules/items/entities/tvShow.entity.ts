import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GenreEnums } from '../../myList/entities/myListSchema.entity';

@Schema()
class Episode {
  @Prop({ required: true, type: Number })
  episodeNumber: number;

  @Prop({ required: true, type: Number })
  seasonNumber: number;

  @Prop({ required: true, type: Date })
  releaseDate: Date;

  @Prop({ required: true, type: String })
  director: string;

  @Prop({ required: true, type: [String] })
  actors: string[];
}

export const EpisodeSchema = SchemaFactory.createForClass(Episode);

@Schema({
  collection: 'tv_show',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class TVShow extends Document {
  @Prop({ required: true, type: String, unique: true })
  id: string;

  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: [String], enum: GenreEnums })
  genres: GenreEnums[];

  @Prop({ type: [EpisodeSchema], default: [] })
  episodes: Episode[];
}

export const TVShowSchema = SchemaFactory.createForClass(TVShow);

// Add indexes for better query performance
TVShowSchema.index({ id: 1 });
TVShowSchema.index({ genres: 1 });

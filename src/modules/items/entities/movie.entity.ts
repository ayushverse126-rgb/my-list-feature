import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GenreEnums } from '../../myList/entities/myListSchema.entity';

@Schema({
  collection: 'movies',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Movie extends Document {
  @Prop({ required: true, type: String, unique: true })
  id: string;

  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: [String], enum: GenreEnums })
  genres: GenreEnums[];

  @Prop({ required: true, type: Date })
  releaseDate: Date;

  @Prop({ required: true, type: String })
  director: string;

  @Prop({ required: true, type: [String] })
  actors: string[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);

// Add indexes for better query performance
MovieSchema.index({ id: 1 });
MovieSchema.index({ genres: 1 });

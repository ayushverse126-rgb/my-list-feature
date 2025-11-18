import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GenreEnums } from '../../myList/entities/myListSchema.entity';

@Schema()
class WatchHistoryItem {
  @Prop({ required: true, type: String })
  contentId: string;

  @Prop({ required: true, type: Date })
  watchedOn: Date;

  @Prop({ type: Number, min: 0, max: 10 })
  rating?: number;
}

const WatchHistoryItemSchema = SchemaFactory.createForClass(WatchHistoryItem);

@Schema()
class UserPreferences {
  @Prop({ required: true, type: [String], enum: GenreEnums })
  favoriteGenres: GenreEnums[];

  @Prop({ required: true, type: [String], enum: GenreEnums })
  dislikedGenres: GenreEnums[];
}

const UserPreferencesSchema = SchemaFactory.createForClass(UserPreferences);

@Schema({
  collection: 'users',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class User extends Document {
  @Prop({ required: true, type: String, unique: true })
  id: string;

  @Prop({ required: true, type: String, unique: true })
  username: string;

  @Prop({ required: true, type: UserPreferencesSchema })
  preferences: UserPreferences;

  @Prop({ type: [WatchHistoryItemSchema], default: [] })
  watchHistory: WatchHistoryItem[];
}

export const UserSchema = SchemaFactory.createForClass(User);

// Add indexes for better query performance
UserSchema.index({ username: 1 });
UserSchema.index({ 'watchHistory.contentId': 1 });

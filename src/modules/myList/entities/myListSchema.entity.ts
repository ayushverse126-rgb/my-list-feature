import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum GenreEnums {
  Action = 'action',
  Comedy = 'comedy',
  Drama = 'drama',
  Fantasy = 'fantasy',
  Horror = 'horror',
  Romance = 'romance',
  SciFi = 'sci-fi',
}

@Schema({
  collection: 'my_list',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class MyList extends Document {
  @Prop({ required: true, type: String })
  userId: string;

  @Prop({ required: true, type: String })
  itemId: string;

  @Prop({ required: true, type: String })
  itemType: 'movie' | 'show';

  @Prop({ required: true, enum: GenreEnums, type: String })
  genre: string;

  @Prop({ default: false, type: Boolean })
  isRemoved: boolean;
}

export const MyListSchema = SchemaFactory.createForClass(MyList);

// add index to the schema
MyListSchema.index({ userId: 1, itemId: 1 }, { unique: true });

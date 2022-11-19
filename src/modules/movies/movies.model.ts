import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Tag } from '../tags/tags.model';

export type MovieDocument = Movie & Document;
@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
    getters: true,
  },
  optimisticConcurrency: true,
  collection: 'movie',
})
export class Movie {
  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
  })
  description: string;

  @Prop({
    type: [Types.ObjectId],
    ref: Tag.name,
  })
  tags: Types.ObjectId[];

  @Prop({
    type: Number,
    required: true,
  })
  movieLengthInMinutes: number;

  @Prop({
    type: Number,
  })
  yearOfRelease: number;

  @Prop({
    type: String,
    required: true,
  })
  coverPicture: string;

  @Prop()
  trailer: string;

  @Prop({
    type: Number,
    min: 0,
    max: 5,
  })
  rating: number;

  @Prop({
    type: [String],
  })
  keywords: string[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);

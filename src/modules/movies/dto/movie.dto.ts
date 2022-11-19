import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  tags: Types.ObjectId[];

  @IsString()
  @IsOptional()
  trailer: string;

  @IsNumber()
  movieLengthInMinutes: number;

  @IsNumber()
  yearOfRelease: number;

  @IsString()
  coverPicture: string;

  @IsNumber()
  @IsOptional()
  rating: number;

  @IsArray()
  @IsOptional()
  keywords: string[];
}

export class UpdateMovieDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @IsOptional()
  tags: Types.ObjectId[];

  @IsString()
  @IsOptional()
  trailer: string;

  @IsNumber()
  @IsOptional()
  movieLengthInMinutes: number;

  @IsNumber()
  @IsOptional()
  yearOfRelease: number;

  @IsString()
  @IsOptional()
  coverPicture: string;

  @IsNumber()
  @IsOptional()
  rating: number;

  @IsArray()
  @IsOptional()
  keywords: string[];
}

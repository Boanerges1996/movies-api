import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateTagDto {
  @IsString()
  name: string;

  @IsMongoId()
  @IsOptional()
  _id?: string;
}

export class UpdateTagDto {
  @IsString()
  name: string;
}

export class UpdateTagParamsDto {
  @IsMongoId()
  tagId: string;
}

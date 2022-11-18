import { IsOptional, IsString } from 'class-validator';

export class FilterParamsDto {
  @IsString()
  @IsOptional()
  limit?: number;

  @IsString()
  @IsOptional()
  page?: number;

  @IsString()
  @IsOptional()
  sort?: string;

  @IsString()
  @IsOptional()
  search?: string;
}

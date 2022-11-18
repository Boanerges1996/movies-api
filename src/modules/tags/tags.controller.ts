import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MovieApiResponse } from '../../common';
import { FilterParamsDto } from '../../common/global.dto';
import { CreateTagDto, UpdateTagDto } from './dto';
import { TagsService } from './tags.service';

@Controller('tags')
@ApiTags('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  async createTag(@Body() tag: CreateTagDto): Promise<MovieApiResponse> {
    return this.tagsService.createTag(tag);
  }

  @Get()
  async getTags(@Param() filter: FilterParamsDto): Promise<MovieApiResponse> {
    return this.tagsService.getTags(filter);
  }

  @Get(':tagId')
  async getTagById(@Param('id') id: string): Promise<MovieApiResponse> {
    return this.tagsService.getSingleTag(id);
  }

  @Patch(':tagId')
  async updateTag(
    @Param('tagId') id: string,
    @Body() tag: UpdateTagDto,
  ): Promise<MovieApiResponse> {
    return this.tagsService.updateTag(id, tag);
  }

  @Delete(':tagId')
  async deleteTag(@Param('tagId') id: string): Promise<MovieApiResponse> {
    return this.tagsService.deleteTag(id);
  }
}

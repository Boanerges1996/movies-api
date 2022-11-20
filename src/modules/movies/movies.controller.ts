import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MovieApiResponse } from '../../common';
import { FilterParamsDto } from '../../common/global.dto';
import { TagsService } from '../tags/tags.service';
import { CreateMovieDto, UpdateMovieDto } from './dto';
import { MoviesService } from './movies.service';

@Controller('movies')
@ApiTags('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly tagsService: TagsService,
  ) {}

  @Post()
  async createMovie(@Body() movie: CreateMovieDto): Promise<MovieApiResponse> {
    const allTagsExists = await this.tagsService.checkAllTagsExistsById(
      movie.tags,
    );
    if (!allTagsExists) {
      throw new HttpException('One or more tags does not exist', 400);
    }
    return this.moviesService.create(movie);
  }

  @Get()
  async getMovies(@Param() filter: FilterParamsDto): Promise<MovieApiResponse> {
    return this.moviesService.getAllMovies(filter);
  }

  @Get(':movieId')
  async getMovieById(
    @Param('movieId') movieId: string,
  ): Promise<MovieApiResponse> {
    return this.moviesService.getMovieById(movieId);
  }

  @Patch(':movieId')
  async updateMovie(
    @Param('movieId') movieId: string,
    @Body() movie: UpdateMovieDto,
  ): Promise<MovieApiResponse> {
    return this.moviesService.updateMovie(movieId, movie);
  }

  @Delete(':movieId')
  async deleteMovie(
    @Param('movieId') movieId: string,
  ): Promise<MovieApiResponse> {
    return this.moviesService.deleteMovieById(movieId);
  }
}

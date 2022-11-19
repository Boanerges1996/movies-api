import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_LIMIT,
  MovieApiResponse,
} from '../../common';
import { FilterParamsDto } from '../../common/global.dto';
import { CreateMovieDto, UpdateMovieDto } from './dto';
import { Movie, MovieDocument } from './movies.model';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>,
  ) {}

  async findMovieById(id: string): Promise<MovieDocument> {
    return this.movieModel.findById(id);
  }

  async deleteMovie(id: string): Promise<MovieDocument> {
    await this.checkMovieExistsById(id);

    return this.movieModel.findByIdAndDelete(id);
  }

  async checkMovieExistsById(id: string): Promise<void> {
    const movieFound = await this.findMovieById(id);

    if (movieFound) {
      throw new HttpException('Movie not found', 404);
    }
  }

  async findMovieByTitle(title: string): Promise<MovieDocument> {
    return this.movieModel.findOne({
      title: {
        $regex: title,
        $options: 'i',
      },
    });
  }

  async checkMovieExistsByTitle(title: string): Promise<void> {
    const movieFound = await this.findMovieByTitle(title);

    if (movieFound) {
      throw new HttpException('Movie already exists', 400);
    }
  }

  async create(movie: CreateMovieDto): Promise<MovieApiResponse> {
    await this.checkMovieExistsByTitle(movie.title);

    const savedMovie = await this.movieModel.create(movie);

    return {
      status: 'success',
      message: 'Movie created',
      data: savedMovie,
    };
  }

  async updateMovie(
    id: string,
    movie: UpdateMovieDto,
  ): Promise<MovieApiResponse> {
    await this.checkMovieExistsById(id);

    const updatedMovie = await this.movieModel.findByIdAndUpdate(id, movie, {
      new: true,
    });

    return {
      status: 'success',
      message: 'Movie updated',
      data: updatedMovie,
    };
  }

  async deleteMovieById(id: string): Promise<MovieApiResponse> {
    await this.checkMovieExistsById(id);

    const deletedMovie = await this.movieModel.findByIdAndDelete(id);

    return {
      status: 'success',
      message: 'Movie deleted',
      data: deletedMovie,
    };
  }

  async getMovieById(id: string): Promise<MovieApiResponse> {
    const movieFound = await this.findMovieById(id);

    if (!movieFound) {
      throw new HttpException('Movie not found', 404);
    }

    return {
      status: 'success',
      message: 'Movie found',
      data: movieFound,
    };
  }

  async getAllMovies(filter: FilterParamsDto): Promise<MovieApiResponse> {
    const where: FilterQuery<MovieDocument> = {};

    const { limit = DEFAULT_PAGE_LIMIT, page = DEFAULT_PAGE, search } = filter;

    if (search) {
      where.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const [movies, total] = await Promise.all([
      this.movieModel
        .find(where)
        .sort({ createdAt: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit))
        .populate('tags')
        .exec(),
      this.movieModel.countDocuments(where).exec(),
    ]);

    return {
      status: 'success',
      message: 'Movies fetched',
      data: {
        movies,
        total,
      },
    };
  }
}

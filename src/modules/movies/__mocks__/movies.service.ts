import { moviesStub } from '../stubs/movies.stub';

export const MoviesService = jest.fn().mockReturnValue({
  createMovie: jest.fn().mockReturnValue({
    status: 'success',
    message: 'Movie created',
    data: moviesStub(),
  }),
  findById: jest.fn().mockResolvedValue(moviesStub()),
  findMovieByName: jest.fn().mockResolvedValue(moviesStub()),
  create: jest.fn().mockResolvedValue(moviesStub()),
  checkMovieExistsById: jest.fn(),
  updateMovie: jest.fn().mockResolvedValue({
    status: 'success',
    message: 'Movie updated',
    data: moviesStub(),
  }),
  getMovies: jest.fn().mockResolvedValue({
    status: 'success',
    message: 'Movies fetched',
    data: {
      movies: [moviesStub()],
      total: 1,
    },
  }),
  deleteMovie: jest.fn().mockResolvedValue({
    status: 'success',
    message: 'Movie deleted',
    data: moviesStub(),
  }),
  getSingleMovie: jest.fn().mockResolvedValue({
    status: 'success',
    message: 'Movie fetched',
    data: moviesStub(),
  }),
});

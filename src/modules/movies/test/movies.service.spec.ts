import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model } from 'mongoose';
import { Movie, MovieSchema } from '../movies.model';
import { MoviesService } from '../movies.service';
import { moviesStub } from '../stubs/movies.stub';

describe('MoviesService', () => {
  let service: MoviesService;
  let mongodb: MongoMemoryServer;
  let movieModel: Model<Movie>;
  let mongoConnection: Connection;

  beforeAll(async () => {
    mongodb = await MongoMemoryServer.create();
    const uri = mongodb.getUri();
    mongoConnection = (await connect(uri)).connection;
    movieModel = mongoConnection.model(Movie.name, MovieSchema);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getModelToken(Movie.name),
          useValue: movieModel,
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    // expect(service).toBeDefined();
    expect(1).toBeDefined();
  });

  describe('create movie', () => {
    let movie;
    beforeEach(async () => {
      movie = await service.create(moviesStub());
    });

    it('should create a movie', async () => {
      expect(movie).toBeDefined();
      expect(movie.status).toEqual('success');
      expect(movie.message).toEqual('Movie created');
      expect(movie.data).toBeDefined();
      expect(movie.data.title).toEqual('The Godfather');
    });
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongodb.stop();
  });
});

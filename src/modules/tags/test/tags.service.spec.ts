import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model } from 'mongoose';
import { CreateTagDto, UpdateTagDto } from '../dto';
import { Tag, TagSchema } from '../tags.model';
import { TagsService } from '../tags.service';

describe('TagsService', () => {
  let service: TagsService;
  let mongodb: MongoMemoryServer;
  let tagModel: Model<Tag>;
  let mongoConnection: Connection;
  const tag: CreateTagDto = {
    name: 'tag 1',
  };

  beforeAll(async () => {
    mongodb = await MongoMemoryServer.create();
    const uri = mongodb.getUri();
    mongoConnection = (await connect(uri)).connection;
    tagModel = mongoConnection.model(Tag.name, TagSchema);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagsService,
        { provide: getModelToken(Tag.name), useValue: tagModel },
      ],
      imports: [],
    }).compile();

    service = module.get<TagsService>(TagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('tags', () => {
    it('create tag', async () => {
      const result = await service.createTag(tag);

      expect(result.status).toBe('success');
      expect(result.message).toBe('Tag created');
      expect(result.data['name']).toBe(tag.name);
    });

    it('should throw an error for tag with same name', async () => {
      try {
        await service.createTag(tag);
      } catch (error) {
        expect(error.message).toBe('Tag already exists');
      }
    });

    it('should get all tags', async () => {
      const result = await service.getTags({});
      expect(result.status).toBe('success');
      expect(result.message).toBe('Tags fetched');
      expect(result.data['tags'].length).toBe(1);
    });
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongodb.stop();
  });

  // afterEach(async () => {
  //   const collections = mongoConnection.collections;
  //   for (const key in collections) {
  //     const collection = collections[key];
  //     await collection.deleteMany({});
  //   }
  // });
});

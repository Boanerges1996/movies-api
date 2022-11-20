import { Test, TestingModule } from '@nestjs/testing';
import { TagsController } from '../tags.controller';
import { TagsService } from '../tags.service';
import { tagsStub, updateTagStub } from './stubs/tags.stub';

jest.mock('../tags.service');

describe('TagsController', () => {
  let controller: TagsController;
  let service: TagsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [TagsService],
    }).compile();
    controller = module.get<TagsController>(TagsController);
    service = module.get<TagsService>(TagsService);
    jest.clearAllMocks();
  });
  describe('create user', () => {
    describe('when create user successfully', () => {
      let tag;
      beforeEach(async () => {
        tag = await controller.createTag(tagsStub());
      });

      test('should call service.createTag', () => {
        expect(service.createTag).toBeCalledWith(tagsStub());
      });

      test('should return a tag', () => {
        expect(tag.data).toEqual(tagsStub());
        expect(tag.status).toEqual('success');
        expect(tag.message).toEqual('Tag created');
      });
    });
  });

  describe('get tags', () => {
    describe('when get tags successfully', () => {
      let tags;
      beforeEach(async () => {
        tags = await controller.getTags({});
      });

      test('should call service.getTags', () => {
        expect(service.getTags).toBeCalledWith({});
      });

      test('should return a tag', () => {
        expect(tags.data).toEqual({ tags: [tagsStub()], total: 1 });
        expect(tags.status).toEqual('success');
        expect(tags.message).toEqual('Tags fetched');
      });
    });
  });

  describe('get tag', () => {
    describe('when get tag successfully', () => {
      let tag;
      beforeEach(async () => {
        tag = await controller.getTagById(tagsStub()._id);
      });

      test('should call service.getTag', () => {
        expect(service.getSingleTag).toBeCalledWith(tagsStub()._id);
      });

      test('should return a tag', () => {
        expect(tag.data).toEqual(tagsStub());
        expect(tag.status).toEqual('success');
        expect(tag.message).toEqual('Tag fetched');
      });
    });
  });

  describe('update tag', () => {
    describe('when update tag successfully', () => {
      let tag;
      beforeEach(async () => {
        tag = await controller.updateTag(tagsStub()._id, updateTagStub());
      });

      test('should call service.updateTag', () => {
        expect(service.updateTag).toBeCalledWith(
          tagsStub()._id,
          updateTagStub(),
        );
      });

      test('should return a tag', () => {
        expect(tag.data).toEqual(updateTagStub());
        expect(tag.status).toEqual('success');
        expect(tag.message).toEqual('Tag updated');
      });
    });
  });

  describe('delete tag', () => {
    describe('when delete tag successfully', () => {
      let tag;
      beforeEach(async () => {
        tag = await controller.deleteTag(tagsStub()._id);
      });

      test('should call service.deleteTag', () => {
        expect(service.deleteTag).toBeCalledWith(tagsStub()._id);
      });

      test('should return a tag', () => {
        expect(tag.data).toEqual(tagsStub());
        expect(tag.status).toEqual('success');
        expect(tag.message).toEqual('Tag deleted');
      });
    });
  });
});

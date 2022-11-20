import { tagsStub, updateTagStub } from '../test/stubs/tags.stub';

export const TagsService = jest.fn().mockReturnValue({
  createTag: jest.fn().mockReturnValue({
    status: 'success',
    message: 'Tag created',
    data: tagsStub(),
  }),
  findById: jest.fn().mockResolvedValue(tagsStub()),
  findTagByName: jest.fn().mockResolvedValue(tagsStub()),
  create: jest.fn().mockResolvedValue(tagsStub()),
  checkTagExistsById: jest.fn(),
  updateTag: jest.fn().mockResolvedValue({
    status: 'success',
    message: 'Tag updated',
    data: updateTagStub(),
  }),
  getTags: jest.fn().mockResolvedValue({
    status: 'success',
    message: 'Tags fetched',
    data: {
      tags: [tagsStub()],
      total: 1,
    },
  }),
  deleteTag: jest.fn().mockResolvedValue({
    status: 'success',
    message: 'Tag deleted',
    data: tagsStub(),
  }),
  getSingleTag: jest.fn().mockResolvedValue({
    status: 'success',
    message: 'Tag fetched',
    data: tagsStub(),
  }),

  checkTagExistsByName: jest.fn().mockReturnValue(true),
});

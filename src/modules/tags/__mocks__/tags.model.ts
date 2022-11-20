import { tagsStub, updateTagStub } from '../test/stubs/tags.stub';

export const mockedTagModel = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(tagsStub()),
  find: jest.fn().mockResolvedValue([tagsStub()]),
  findOne: jest.fn().mockResolvedValue(tagsStub()),
  findById: jest.fn().mockResolvedValue(tagsStub()),
  findByIdAndUpdate: jest.fn().mockResolvedValue(updateTagStub()),
  findByIdAndDelete: jest.fn().mockResolvedValue(tagsStub()),
  countDocuments: jest.fn().mockResolvedValue(1),
  findOneAndUpdate: jest.fn().mockResolvedValue(updateTagStub()),
  findOneAndDelete: jest.fn().mockResolvedValue(tagsStub()),
});

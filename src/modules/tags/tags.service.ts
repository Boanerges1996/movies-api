import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import {
  MovieApiResponse,
  DEFAULT_PAGE,
  DEFAULT_PAGE_LIMIT,
} from '../../common';
import { FilterParamsDto } from '../../common/global.dto';
import { CreateTagDto } from './dto';
import { Tag, TagDocument } from './tags.model';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag.name) private readonly tagModel: Model<TagDocument>,
  ) {}

  findTagById(id: string) {
    return this.tagModel.findById(id);
  }

  findTagByName(name: string) {
    // should use regex to search with case insensitive
    return this.tagModel.findOne({
      name: {
        $regex: name,
        $options: 'i',
      },
    });
  }

  async create(tag: CreateTagDto): Promise<TagDocument> {
    return this.tagModel.create(tag);
  }

  async createTag(tag: CreateTagDto): Promise<MovieApiResponse> {
    const { name } = tag;
    const tagFound = await this.findTagByName(name);

    if (tagFound) {
      throw new HttpException('Tag already exists', 400);
    }

    const newTag = await this.create(tag);

    return {
      status: 'success',
      message: 'Tag created',
      data: newTag,
    };
  }

  async checkTagExistsById(id: string): Promise<void> {
    const tagFound = await this.findTagById(id);

    if (!tagFound) {
      throw new HttpException('Tag not found', 404);
    }
  }

  async updateTag(id: string, tag: CreateTagDto): Promise<MovieApiResponse> {
    await this.checkTagExistsById(id);

    const updatedTag = await this.tagModel.findByIdAndUpdate(id, tag, {
      new: true,
    });

    return {
      status: 'success',
      message: 'Tag updated',
      data: updatedTag,
    };
  }

  async deleteTag(id: string): Promise<MovieApiResponse> {
    await this.checkTagExistsById(id);
    const deletedTag = await this.tagModel.findByIdAndDelete(id);

    return {
      status: 'success',
      message: 'Tag deleted',
      data: deletedTag,
    };
  }

  async getTags(filter: FilterParamsDto): Promise<MovieApiResponse> {
    const where: FilterQuery<TagDocument> = {};

    const { limit = DEFAULT_PAGE_LIMIT, page = DEFAULT_PAGE, search } = filter;

    if (search) {
      where.name = {
        $regex: search,
        $options: 'i',
      };
    }

    const [tags, total] = await Promise.all([
      this.tagModel
        .find(where)
        .sort({ createdAt: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit))
        .exec(),
      this.tagModel.countDocuments(where).exec(),
    ]);

    return {
      status: 'success',
      message: 'Tags fetched',
      data: {
        tags,
        total,
      },
    };
  }

  async getSingleTag(id: string): Promise<MovieApiResponse> {
    const tagFound = await this.findTagById(id);

    if (!tagFound) {
      throw new HttpException('Tag not found', 404);
    }

    return {
      status: 'success',
      message: 'Tag fetched',
      data: tagFound,
    };
  }

  async checkAllTagsExistsById(ids: Types.ObjectId[]): Promise<boolean> {
    const tagsFound = await this.tagModel.find({
      _id: {
        $in: ids,
      },
    });

    if (tagsFound.length !== ids.length) {
      return false;
    }

    return true;
  }
}

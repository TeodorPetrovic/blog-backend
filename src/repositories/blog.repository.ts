import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from 'src/entities/blog.entity';

@Injectable()
export class BlogRepository {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<Blog>
  ) {}

  async create(blog: Partial<Blog>): Promise<Blog> {
    const newBlog = new this.blogModel(blog);
    return newBlog.save();
  }

  async findAll(): Promise<Blog[]> {
    return this.blogModel
      .find()
      .populate('author', '-password') // Populate author data (exclude sensitive fields)
      .populate('comments.user', '-password') // Populate comment authors
      .exec();
  }

  async findById(id: string): Promise<Blog | null> {
    return this.blogModel
      .findById(id)
      .populate('author', '-password') // Populate author
      .populate('comments.user', '-password') // Populate comment authors
      .exec();
  }

  async findByCategory(categoryId: string): Promise<Blog[]> {
    return this.blogModel
      .find({ category: categoryId })
      .populate('author', '-password')
      .populate('comments.user', '-password')
      .exec();
  }

  async findByTag(tag: string): Promise<Blog[]> {
    return this.blogModel
      .find({ tags: tag })
      .populate('author', '-password')
      .populate('comments.user', '-password')
      .exec();
  }

  async findByCategoryAndTag(categoryId: string, tag: string): Promise<Blog[]> {
    return this.blogModel
      .find({ category: categoryId, tags: tag })
      .populate('author', '-password')
      .populate('comments.user', '-password')
      .exec();
  }

  async update(id: string, updateData: Partial<Blog>): Promise<Blog | null> {
    return this.blogModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Blog | null> {
    return this.blogModel.findByIdAndDelete(id).exec();
  }

  async addComment(
    blogId: string,
    comment: { user: string; content: string },
  ): Promise<Blog | null> {
    return this.blogModel
      .findByIdAndUpdate(
        blogId,
        { $push: { comments: comment } },
        { new: true },
      )
      .populate('comments.user', '-password') // Populate comment authors
      .exec();
  }
}
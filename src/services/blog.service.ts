import { Injectable, NotFoundException } from '@nestjs/common';
import { Blog } from 'src/entities/blog.entity';
import { BlogRepository } from 'src/repositories/blog.repository';

@Injectable()
export class BlogService {
  constructor(private readonly blogRepository: BlogRepository) {}

  async create(blog: Partial<Blog>): Promise<Blog> {
    return this.blogRepository.create(blog);
  }

  async findAll(): Promise<Blog[]> {
    return this.blogRepository.findAll();
  }

  async findById(id: string): Promise<Blog> {
    const blog = await this.blogRepository.findById(id);
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    return blog;
  }

  async findByCategory(categoryId: string): Promise<Blog[]> {
    return this.blogRepository.findByCategory(categoryId);
  }

  async findByTag(tag: string): Promise<Blog[]> {
    return this.blogRepository.findByTag(tag);
  }

  async findByCategoryAndTag(categoryId: string, tag: string): Promise<Blog[]> {
    return this.blogRepository.findByCategoryAndTag(categoryId, tag);
  }

  async update(id: string, updateData: Partial<Blog>): Promise<Blog> {
    const blog = await this.blogRepository.update(id, updateData);
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    return blog;
  }

  async delete(id: string): Promise<Blog> {
    const blog = await this.blogRepository.delete(id);
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    return blog;
  }

  async addComment(blogId: string, comment: { user: string; content: string }): Promise<Blog> {
    const blog = await this.blogRepository.addComment(blogId, comment);
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    return blog;
  }
}
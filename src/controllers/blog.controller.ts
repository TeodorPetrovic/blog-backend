import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { Blog } from 'src/entities/blog.entity';
import { BlogService } from 'src/services/blog.service';

@Controller('blogs')
export class BlogController {
    constructor(private readonly blogService: BlogService) { }

    @Post("create")
    async create(
        @Body() body: { title: string; content: string; author: string; tags?: string[] },
    ): Promise<Blog> {
        return this.blogService.create(body);
    }

    @Get()
    async findAll(): Promise<Blog[]> {
        return this.blogService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<Blog> {
        return this.blogService.findById(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() body: Partial<Blog>,
    ): Promise<Blog> {
        return this.blogService.update(id, body);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Blog> {
        return this.blogService.delete(id);
    }

    @Post(':id/comments')
    async addComment(
        @Param('id') blogId: string,
        @Body() body: { user: string; content: string },
    ): Promise<Blog> {
        return this.blogService.addComment(blogId, body);
    }
}  
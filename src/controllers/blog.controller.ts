import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { Blog } from 'src/entities/blog.entity';
import { BlogService } from 'src/services/blog.service';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('blogs')
@UseGuards(RolesGuard)
export class BlogController {
    constructor(private readonly blogService: BlogService) {}

    @Post('create')
    @Roles('admin')
    async create(@Body() body: { title: string; content: string; author: string; tags?: string[]; category: string }): Promise<Blog> {
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

    @Get('category/:categoryId')
    async findByCategory(@Param('categoryId') categoryId: string): Promise<Blog[]> {
        return this.blogService.findByCategory(categoryId);
    }

    @Get('tag/:tag')
    async findByTag(@Param('tag') tag: string): Promise<Blog[]> {
        return this.blogService.findByTag(tag);
    }

    @Get('category/:categoryId/tag/:tag')
    async findByCategoryAndTag(@Param('categoryId') categoryId: string, @Param('tag') tag: string): Promise<Blog[]> {
        return this.blogService.findByCategoryAndTag(categoryId, tag);
    }

    @Put(':id')
    @Roles('admin')
    async update(@Param('id') id: string, @Body() body: Partial<Blog>): Promise<Blog> {
        return this.blogService.update(id, body);
    }

    @Delete(':id')
    @Roles('admin')
    async delete(@Param('id') id: string): Promise<Blog> {
        return this.blogService.delete(id);
    }

    @Post(':id/comments')
    async addComment(@Param('id') blogId: string, @Body() body: { user: string; content: string }): Promise<Blog> {
        return this.blogService.addComment(blogId, body);
    }
}
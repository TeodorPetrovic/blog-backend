import { Controller, Post, Get, Put, Delete, Body, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { Category } from 'src/entities/category.entity';
import { CategoryService } from 'src/services/category.service';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    async create(@Body() body: { name: string }): Promise<Category> {
        return this.categoryService.create(body);
    }

    @Get()
    async findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<Category> {
        return this.categoryService.findById(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: Partial<Category>): Promise<Category> {
        return this.categoryService.update(id, body);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Category> {
        return this.categoryService.delete(id);
    }
}
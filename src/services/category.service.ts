import { Injectable, NotFoundException } from "@nestjs/common";
import { Category } from "src/entities/category.entity";
import { CategoryRepository } from "src/repositories/category.repository";

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    async create(category: Partial<Category>): Promise<Category> {
        return this.categoryRepository.create(category);
    }

    async findAll(): Promise<Category[]> {
        return this.categoryRepository.findAll();
    }

    async findById(id: string): Promise<Category> {
        const category = await this.categoryRepository.findById(id);
        if (!category) {
            throw new NotFoundException('Category not found');
        }
        return category;
    }

    async update(id: string, updateData: Partial<Category>): Promise<Category> {
        const category = await this.categoryRepository.update(id, updateData);
        if (!category) {
            throw new NotFoundException('Category not found');
        }
        return category;
    }

    async delete(id: string): Promise<Category> {
        const category = await this.categoryRepository.delete(id);
        if (!category) {
            throw new NotFoundException('Category not found');
        }
        return category;
    }
}
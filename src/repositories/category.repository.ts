import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category } from "src/entities/category.entity";

@Injectable()
export class CategoryRepository {
    constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

    async create(category: Partial<Category>): Promise<Category> {
        return new this.categoryModel(category).save();
    }

    async findAll(): Promise<Category[]> {
        return this.categoryModel.find().exec();
    }

    async findById(id: string): Promise<Category | null> {
        return this.categoryModel.findById(id).exec();
    }

    async update(id: string, updateData: Partial<Category>): Promise<Category | null> {
        return this.categoryModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }

    async delete(id: string): Promise<Category | null> {
        return this.categoryModel.findByIdAndDelete(id).exec();
    }
}
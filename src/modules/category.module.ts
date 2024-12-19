import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/entities/category.entity';
import { CategoryRepository } from 'src/repositories/category.repository';
import { CategoryService } from 'src/services/category.service';
import { CategoryController } from 'src/controllers/category.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
    providers: [CategoryRepository, CategoryService],
    controllers: [CategoryController],
})
export class CategoryModule {}
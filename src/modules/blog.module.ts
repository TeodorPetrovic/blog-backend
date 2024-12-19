import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogController } from 'src/controllers/blog.controller';
import { Blog, BlogSchema } from 'src/entities/blog.entity';
import { BlogRepository } from 'src/repositories/blog.repository';
import { BlogService } from 'src/services/blog.service';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [BlogController],
  providers: [BlogService, BlogRepository],
  exports: [BlogService], // Export BlogService if used in other modules
})
export class BlogModule {}
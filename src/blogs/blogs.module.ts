import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { Blog } from './entities/blog.entity';
import { Category } from '../category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Blog, Category,User])],
    controllers: [BlogController],
    providers: [BlogsService],
    exports: [BlogsService],
})
export class BlogModule {}
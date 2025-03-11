import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Category } from '../category/entities/category.entity';

@Injectable()
export class BlogsService {
    constructor(
        @InjectRepository(Blog)
        private readonly blogRepository: Repository<Blog>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    async create(createBlogDto: CreateBlogDto): Promise<Blog> {
        const category = await this.categoryRepository.findOne({ 
            where: { id: createBlogDto.categoryId }
        });
        
        if (!category) {
            throw new NotFoundException('Category not found');
        }

        const blog = this.blogRepository.create({
            ...createBlogDto,
            category,
        });

        return this.blogRepository.save(blog);
    }

    async findAll(): Promise<Blog[]> {
        return this.blogRepository.find({
            relations: ['category'],
        });
    }

    async findOne(id: string): Promise<Blog> {
        const blog = await this.blogRepository.findOne({
            where: { id },
            relations: ['category'],
        });

        if (!blog) {
            throw new NotFoundException('Blog not found');
        }

        return blog;
    }

    async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
        const blog = await this.findOne(id);

        if (updateBlogDto.categoryId) {
            const category = await this.categoryRepository.findOne({
                where: { id: updateBlogDto.categoryId }
            });
            if (!category) {
                throw new NotFoundException('Category not found');
            }
            blog.category = category;
        }

        Object.assign(blog, updateBlogDto);
        return this.blogRepository.save(blog);
    }

    async remove(id: string): Promise<void> {
        const blog = await this.findOne(id);
        await this.blogRepository.remove(blog);
    }

    async getFeaturedBlogs(): Promise<Blog[]> {
        return this.blogRepository.find({
            where: { isFeatured: true },
            relations: ['category'],
        });
    }

    async getTrendingBlogs(): Promise<Blog[]> {
        return this.blogRepository.find({
            where: { isTrending: true },
            relations: ['category'],
            order: { viewCount: 'DESC' },
        });
    }

    async getLatestBlogs(): Promise<Blog[]> {
        return this.blogRepository.find({
            where: { isLatest: true },
            relations: ['category'],
            order: { createdAt: 'DESC' },
        });
    }
}
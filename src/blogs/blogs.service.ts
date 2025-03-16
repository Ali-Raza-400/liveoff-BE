import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Category } from '../category/entities/category.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class BlogsService {
    constructor(
        @InjectRepository(Blog)
        private readonly blogRepository: Repository<Blog>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createBlogDto: CreateBlogDto, userid: any): Promise<any> {
        console.log("Req:::",userid);
        
        const category = await this.categoryRepository.findOne({ where: { id: createBlogDto.categoryId } });
        if (!category) throw new NotFoundException('Category not found');
    
        const author = await this.userRepository.findOne({ where: { id: userid } });
        if (!author) throw new NotFoundException('Author not found');
    
        const blog = this.blogRepository.create({
            ...createBlogDto,
            category,
            author: { id: author.id } as any, // Assign only the author id
        });
    
        return this.blogRepository.save(blog); // 👈 Save the blog
    }
    

    async findAll(): Promise<Blog[]> {
        return this.blogRepository.find({ relations: ['category', 'author'] });
    }

    async findOne(id: string): Promise<Blog> {
        const blog = await this.blogRepository.findOne({ where: { id }, relations: ['category', 'author'] });
        if (!blog) throw new NotFoundException('Blog not found');
        console.log("blog:::",blog);
        
        return blog;
    }

    async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
        const blog = await this.findOne(id);

        if (updateBlogDto.categoryId) {
            const category = await this.categoryRepository.findOne({ where: { id: updateBlogDto.categoryId } });
            if (!category) throw new NotFoundException('Category not found');
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
            relations: ['category', 'author'],
        });
    }

    async setFeaturedBlog(id: string, isFeatured: boolean): Promise<Blog> {
        const blog = await this.findOne(id);
        blog.isFeatured = isFeatured;
        return this.blogRepository.save(blog);
    }

    async getTrendingBlogs(): Promise<Blog[]> {
        return this.blogRepository.find({
            where: { isTrending: true },
            relations: ['category', 'author'], // Include related data
            order: { viewCount: 'DESC' }, // Sort by views (optional)
        });
    }

    async getLatestBlogs(): Promise<Blog[]> {
        return this.blogRepository.find({
            where: { isLatest: true },
            relations: ['category', 'author'], // Include category & author details
            order: { createdAt: 'DESC' }, // Sort by newest first
        });
    }
    

}

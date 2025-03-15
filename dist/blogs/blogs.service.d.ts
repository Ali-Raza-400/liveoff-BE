import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Category } from '../category/entities/category.entity';
import { User } from '../user/entities/user.entity';
export declare class BlogsService {
    private readonly blogRepository;
    private readonly categoryRepository;
    private readonly userRepository;
    constructor(blogRepository: Repository<Blog>, categoryRepository: Repository<Category>, userRepository: Repository<User>);
    create(createBlogDto: CreateBlogDto): Promise<Blog>;
    findAll(): Promise<Blog[]>;
    findOne(id: string): Promise<Blog>;
    update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog>;
    remove(id: string): Promise<void>;
    getFeaturedBlogs(): Promise<Blog[]>;
    setFeaturedBlog(id: string, isFeatured: boolean): Promise<Blog>;
    getTrendingBlogs(): Promise<Blog[]>;
    getLatestBlogs(): Promise<Blog[]>;
}

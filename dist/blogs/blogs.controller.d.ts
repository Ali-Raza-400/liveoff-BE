import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogsService);
    create(createBlogDto: CreateBlogDto, req: any): Promise<any>;
    findAll(): Promise<Blog[]>;
    getFeaturedBlogs(): Promise<Blog[]>;
    setFeaturedBlog(id: string, { isFeatured }: {
        isFeatured: boolean;
    }): Promise<Blog>;
    findOne(id: string): Promise<Blog>;
    update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog>;
    remove(id: string): Promise<void>;
    getTrendingBlogs(): Promise<Blog[]>;
    getLatestBlogs(): Promise<Blog[]>;
}

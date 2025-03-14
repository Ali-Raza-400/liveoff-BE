import { Controller, Get, Post, Patch, Param, Delete, Body } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Blog } from './entities/blog.entity';

@ApiTags('blogs')
@Controller('blogs')
export class BlogController {
    constructor(private readonly blogService: BlogsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new blog post' })
    @ApiResponse({ status: 201, description: 'Blog post created successfully', type: Blog })
    create(@Body() createBlogDto: CreateBlogDto) {
        return this.blogService.create(createBlogDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all blog posts' })
    @ApiResponse({ status: 200, description: 'Returns all blog posts', type: [Blog] })
    findAll() {
        return this.blogService.findAll();
    }

    @Get('featured')
    @ApiOperation({ summary: 'Get featured blog posts' })
    @ApiResponse({ status: 200, description: 'Returns featured blog posts', type: [Blog] })
    getFeaturedBlogs() {
        return this.blogService.getFeaturedBlogs();
    }

    @Post(':id/feature')
    @ApiOperation({ summary: 'Mark a blog as featured' })
    @ApiResponse({ status: 200, description: 'Blog post marked as featured', type: Blog })
    setFeaturedBlog(@Param('id') id: string, @Body() { isFeatured }: { isFeatured: boolean }) {
        return this.blogService.setFeaturedBlog(id, isFeatured);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a blog post by ID' })
    @ApiParam({ name: 'id', description: 'Blog post ID' })
    @ApiResponse({ status: 200, description: 'Returns a blog post', type: Blog })
    findOne(@Param('id') id: string) {
        return this.blogService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a blog post' })
    update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
        return this.blogService.update(id, updateBlogDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a blog post' })
    remove(@Param('id') id: string) {
        return this.blogService.remove(id);
    }

    @Get('trending')
    @ApiOperation({ summary: 'Get trending blog posts' })
    @ApiResponse({ status: 200, description: 'Returns trending blog posts', type: [Blog] })
    async getTrendingBlogs() {
        return this.blogService.getTrendingBlogs();
    }

    @Get('latest')
@ApiOperation({ summary: 'Get latest blog posts' })
@ApiResponse({ status: 200, description: 'Returns latest blog posts', type: [Blog] })
async getLatestBlogs() {
    return this.blogService.getLatestBlogs();
}

}

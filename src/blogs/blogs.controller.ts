import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Blog } from './entities/blog.entity';

@ApiTags('blogs')
@Controller('blogs')
export class BlogController {
    constructor(private readonly blogService: BlogsService) {}

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

    @Get('trending')
    @ApiOperation({ summary: 'Get trending blog posts' })
    @ApiResponse({ status: 200, description: 'Returns trending blog posts', type: [Blog] })
    getTrendingBlogs() {
        return this.blogService.getTrendingBlogs();
    }

    @Get('latest')
    @ApiOperation({ summary: 'Get latest blog posts' })
    @ApiResponse({ status: 200, description: 'Returns latest blog posts', type: [Blog] })
    getLatestBlogs() {
        return this.blogService.getLatestBlogs();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a blog post by ID' })
    @ApiParam({ name: 'id', description: 'Blog post ID' })
    @ApiResponse({ status: 200, description: 'Returns a blog post', type: Blog })
    @ApiResponse({ status: 404, description: 'Blog post not found' })
    findOne(@Param('id') id: string) {
        return this.blogService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a blog post' })
    @ApiParam({ name: 'id', description: 'Blog post ID' })
    @ApiResponse({ status: 200, description: 'Blog post updated successfully', type: Blog })
    @ApiResponse({ status: 404, description: 'Blog post not found' })
    update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
        return this.blogService.update(id, updateBlogDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a blog post' })
    @ApiParam({ name: 'id', description: 'Blog post ID' })
    @ApiResponse({ status: 200, description: 'Blog post deleted successfully' })
    @ApiResponse({ status: 404, description: 'Blog post not found' })
    remove(@Param('id') id: string) {
        return this.blogService.remove(id);
    }
}
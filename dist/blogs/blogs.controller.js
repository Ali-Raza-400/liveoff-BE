"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogController = void 0;
const common_1 = require("@nestjs/common");
const blogs_service_1 = require("./blogs.service");
const create_blog_dto_1 = require("./dto/create-blog.dto");
const update_blog_dto_1 = require("./dto/update-blog.dto");
const swagger_1 = require("@nestjs/swagger");
const blog_entity_1 = require("./entities/blog.entity");
let BlogController = class BlogController {
    blogService;
    constructor(blogService) {
        this.blogService = blogService;
    }
    create(createBlogDto) {
        return this.blogService.create(createBlogDto);
    }
    findAll() {
        return this.blogService.findAll();
    }
    getFeaturedBlogs() {
        return this.blogService.getFeaturedBlogs();
    }
    setFeaturedBlog(id, { isFeatured }) {
        return this.blogService.setFeaturedBlog(id, isFeatured);
    }
    findOne(id) {
        return this.blogService.findOne(id);
    }
    update(id, updateBlogDto) {
        return this.blogService.update(id, updateBlogDto);
    }
    remove(id) {
        return this.blogService.remove(id);
    }
    async getTrendingBlogs() {
        return this.blogService.getTrendingBlogs();
    }
    async getLatestBlogs() {
        return this.blogService.getLatestBlogs();
    }
};
exports.BlogController = BlogController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new blog post' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Blog post created successfully', type: blog_entity_1.Blog }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_blog_dto_1.CreateBlogDto]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all blog posts' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns all blog posts', type: [blog_entity_1.Blog] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('featured'),
    (0, swagger_1.ApiOperation)({ summary: 'Get featured blog posts' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns featured blog posts', type: [blog_entity_1.Blog] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "getFeaturedBlogs", null);
__decorate([
    (0, common_1.Post)(':id/feature'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark a blog as featured' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Blog post marked as featured', type: blog_entity_1.Blog }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "setFeaturedBlog", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a blog post by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Blog post ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns a blog post', type: blog_entity_1.Blog }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a blog post' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_blog_dto_1.UpdateBlogDto]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a blog post' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('trending'),
    (0, swagger_1.ApiOperation)({ summary: 'Get trending blog posts' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns trending blog posts', type: [blog_entity_1.Blog] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getTrendingBlogs", null);
__decorate([
    (0, common_1.Get)('latest'),
    (0, swagger_1.ApiOperation)({ summary: 'Get latest blog posts' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns latest blog posts', type: [blog_entity_1.Blog] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getLatestBlogs", null);
exports.BlogController = BlogController = __decorate([
    (0, swagger_1.ApiTags)('blogs'),
    (0, common_1.Controller)('blogs'),
    __metadata("design:paramtypes", [blogs_service_1.BlogsService])
], BlogController);
//# sourceMappingURL=blogs.controller.js.map
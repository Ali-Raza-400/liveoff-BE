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
exports.BlogsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const blog_entity_1 = require("./entities/blog.entity");
const category_entity_1 = require("../category/entities/category.entity");
const user_entity_1 = require("../user/entities/user.entity");
let BlogsService = class BlogsService {
    blogRepository;
    categoryRepository;
    userRepository;
    constructor(blogRepository, categoryRepository, userRepository) {
        this.blogRepository = blogRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }
    async create(createBlogDto, userid) {
        console.log("Req:::", userid);
        const category = await this.categoryRepository.findOne({ where: { id: createBlogDto.categoryId } });
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        const author = await this.userRepository.findOne({ where: { id: userid } });
        if (!author)
            throw new common_1.NotFoundException('Author not found');
        const blog = this.blogRepository.create({
            ...createBlogDto,
            category,
            author: { id: author.id },
        });
        return this.blogRepository.save(blog);
    }
    async findAll() {
        return this.blogRepository.find({ relations: ['category', 'author'] });
    }
    async findOne(id) {
        const blog = await this.blogRepository.findOne({ where: { id }, relations: ['category', 'author'] });
        if (!blog)
            throw new common_1.NotFoundException('Blog not found');
        console.log("blog:::", blog);
        return blog;
    }
    async update(id, updateBlogDto) {
        const blog = await this.findOne(id);
        if (updateBlogDto.categoryId) {
            const category = await this.categoryRepository.findOne({ where: { id: updateBlogDto.categoryId } });
            if (!category)
                throw new common_1.NotFoundException('Category not found');
            blog.category = category;
        }
        Object.assign(blog, updateBlogDto);
        return this.blogRepository.save(blog);
    }
    async remove(id) {
        const blog = await this.findOne(id);
        await this.blogRepository.remove(blog);
    }
    async getFeaturedBlogs() {
        return this.blogRepository.find({
            where: { isFeatured: true },
            relations: ['category', 'author'],
        });
    }
    async setFeaturedBlog(id, isFeatured) {
        const blog = await this.findOne(id);
        blog.isFeatured = isFeatured;
        return this.blogRepository.save(blog);
    }
    async getTrendingBlogs() {
        return this.blogRepository.find({
            where: { isTrending: true },
            relations: ['category', 'author'],
            order: { viewCount: 'DESC' },
        });
    }
    async getLatestBlogs() {
        return this.blogRepository.find({
            where: { isLatest: true },
            relations: ['category', 'author'],
            order: { createdAt: 'DESC' },
        });
    }
};
exports.BlogsService = BlogsService;
exports.BlogsService = BlogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(blog_entity_1.Blog)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BlogsService);
//# sourceMappingURL=blogs.service.js.map
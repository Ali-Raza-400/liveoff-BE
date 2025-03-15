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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const category_entity_1 = require("../../category/entities/category.entity");
const user_entity_1 = require("../../user/entities/user.entity");
let Blog = class Blog {
    id;
    title;
    content;
    featuredImage;
    metaDescription;
    isFeatured;
    featuredAt;
    isTrending;
    isLatest;
    viewCount;
    category;
    createdAt;
    updatedAt;
    author;
};
exports.Blog = Blog;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier for the blog' }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Blog.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Title of the blog post' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Blog.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Content of the blog post' }),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Blog.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Featured image URL of the blog post' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Blog.prototype, "featuredImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Meta description for SEO' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Blog.prototype, "metaDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the blog post is featured' }),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Blog.prototype, "isFeatured", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date and time when the blog was featured', nullable: true }),
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], Blog.prototype, "featuredAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the blog post is trending' }),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Blog.prototype, "isTrending", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the blog post is latest' }),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Blog.prototype, "isLatest", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'View count of the blog post' }),
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Blog.prototype, "viewCount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, category => category.blogs),
    __metadata("design:type", category_entity_1.Category)
], Blog.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Blog.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Blog.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User who created the blog' }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.blogs, { lazy: true, nullable: false }),
    __metadata("design:type", Promise)
], Blog.prototype, "author", void 0);
exports.Blog = Blog = __decorate([
    (0, typeorm_1.Entity)()
], Blog);
//# sourceMappingURL=blog.entity.js.map
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
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const store_entity_1 = require("../../store/entities/store.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const coupon_entity_1 = require("../../coupon/entities/coupon.entity");
const swagger_1 = require("@nestjs/swagger");
const category_entity_1 = require("../../category/entities/category.entity");
let Product = class Product {
    id;
    storeId;
    name;
    heading;
    oldPrice;
    currentPrice;
    detail;
    imageUrl;
    htmlUrl;
    category;
    sku;
    size;
    color;
    material;
    isFeatured;
    isActive;
    createdAt;
    updatedAt;
    userId;
    store;
    user;
    coupons;
    categoryEntity;
    categoryId;
};
exports.Product = Product;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier for the product',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The store this product belongs to',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name of the product',
        example: 'LP electric guitar'
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product heading or title',
        example: 'Donner DLP-124S LP Electric Guitar Kit'
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "heading", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Old price of the product',
        example: '149.99',
        nullable: true
    }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "oldPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current price of the product',
        example: '129.99'
    }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Product.prototype, "currentPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Detailed description of the product',
        example: 'This DLP-124S LP electric guitar kit features a sunburst yellow body with bag, strap, cable, and more accessories.'
    }),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Product.prototype, "detail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL to the product image',
        example: 'https://example.com/product-image.jpg',
        nullable: true
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'HTML URL for the product',
        example: 'https://to.tradetracker.net/?c=24226&m=12&a=374223&r=&u=',
        nullable: true
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "htmlUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Category of the product',
        example: 'Electronics'
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Stock Keeping Unit (SKU) of the product',
        example: 'EC1276'
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "sku", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Size of the product',
        example: '39 inch',
        nullable: true
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Color of the product',
        example: 'Sunburst Yellow',
        nullable: true
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Material of the product',
        example: 'AAA Solid Poplar',
        nullable: true
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "material", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag indicating if this is a featured product',
        example: true,
        default: false
    }),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Product.prototype, "isFeatured", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag indicating if the product is active',
        example: true,
        default: true
    }),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Product.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when the product was created',
        example: '2023-01-01T00:00:00Z'
    }),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when the product was last updated',
        example: '2023-01-02T00:00:00Z'
    }),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the user who created this product',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => store_entity_1.Store, store => store.products),
    (0, typeorm_1.JoinColumn)({ name: 'storeId' }),
    __metadata("design:type", store_entity_1.Store)
], Product.prototype, "store", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.products),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], Product.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => coupon_entity_1.Coupon, coupon => coupon.products),
    __metadata("design:type", Array)
], Product.prototype, "coupons", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, category => category.products),
    (0, typeorm_1.JoinColumn)({ name: 'categoryId' }),
    __metadata("design:type", category_entity_1.Category)
], Product.prototype, "categoryEntity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "categoryId", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)()
], Product);
//# sourceMappingURL=product.entity.js.map
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
exports.Coupon = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
const store_entity_1 = require("../../store/entities/store.entity");
const product_entity_1 = require("../../product/entities/product.entity");
const swagger_1 = require("@nestjs/swagger");
const category_entity_1 = require("../../category/entities/category.entity");
const event_entity_1 = require("../../events/entities/event.entity");
let Coupon = class Coupon {
    id;
    name;
    detail;
    code;
    htmlCodeUrl;
    startDate;
    endDate;
    category;
    rank;
    isFreeShipping;
    isExclusive;
    isVerified;
    showOnHomePage;
    isTopCategory;
    mainImage;
    secondaryImage;
    codeImage;
    isActive;
    createdAt;
    updatedAt;
    storeId;
    userId;
    store;
    user;
    products;
    categoryEntity;
    categoryId;
    events;
};
exports.Coupon = Coupon;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier for the coupon',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Coupon.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name of the coupon',
        example: '€350 De Reduction Promo'
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Coupon.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Detailed description of the coupon',
        example: 'Christmas Sale! Get up to €350 off on your purchase when you shop through this landing page.'
    }),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Coupon.prototype, "detail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The coupon code',
        example: 'SAVE350',
        nullable: true
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Coupon.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'HTML code URL for the coupon',
        example: 'https://clk.tradedoubler.com/click?p=311962&a=3237124&url=https%3A%2F%2Fr.donner-music.com',
        nullable: true
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Coupon.prototype, "htmlCodeUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Start date of the coupon validity',
        example: '2023-12-01T00:00:00Z'
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Coupon.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'End date of the coupon validity',
        example: '2023-12-31T23:59:59Z'
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Coupon.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Category of the coupon',
        example: 'Electronics'
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Coupon.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Rank of the coupon for sorting',
        example: 2,
        default: 0
    }),
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Coupon.prototype, "rank", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag indicating if this is a free shipping coupon',
        example: false,
        default: false
    }),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Coupon.prototype, "isFreeShipping", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag indicating if this coupon is exclusive',
        example: false,
        default: false
    }),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Coupon.prototype, "isExclusive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag indicating if this coupon is verified',
        example: true,
        default: false
    }),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Coupon.prototype, "isVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag indicating if this coupon should be shown on the home page',
        example: false,
        default: false
    }),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Coupon.prototype, "showOnHomePage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag indicating if this coupon is a top category coupon',
        example: false,
        default: false
    }),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Coupon.prototype, "isTopCategory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Main image for the coupon',
        example: '€350',
        nullable: true
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Coupon.prototype, "mainImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Secondary image for the coupon',
        example: 'De Reduction',
        nullable: true
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Coupon.prototype, "secondaryImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Code image for the coupon',
        example: 'Code',
        nullable: true
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Coupon.prototype, "codeImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag indicating if the coupon is active',
        example: true,
        default: true
    }),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Coupon.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when the coupon was created',
        example: '2023-01-01T00:00:00Z'
    }),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Coupon.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when the coupon was last updated',
        example: '2023-01-02T00:00:00Z'
    }),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Coupon.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the store this coupon belongs to',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Coupon.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the user who created this coupon',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Coupon.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => store_entity_1.Store, store => store.coupons),
    (0, typeorm_1.JoinColumn)({ name: 'storeId' }),
    __metadata("design:type", store_entity_1.Store)
], Coupon.prototype, "store", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.coupons),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], Coupon.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => product_entity_1.Product),
    (0, typeorm_1.JoinTable)({
        name: 'coupon_products',
        joinColumn: { name: 'couponId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'productId', referencedColumnName: 'id' }
    }),
    __metadata("design:type", Array)
], Coupon.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, category => category.coupons),
    (0, typeorm_1.JoinColumn)({ name: 'categoryId' }),
    __metadata("design:type", category_entity_1.Category)
], Coupon.prototype, "categoryEntity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Coupon.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => event_entity_1.Event, (event) => event.coupons),
    __metadata("design:type", Array)
], Coupon.prototype, "events", void 0);
exports.Coupon = Coupon = __decorate([
    (0, typeorm_1.Entity)()
], Coupon);
//# sourceMappingURL=coupon.entity.js.map
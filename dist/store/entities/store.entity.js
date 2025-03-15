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
exports.Store = exports.FAQ = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
const product_entity_1 = require("../../product/entities/product.entity");
const coupon_entity_1 = require("../../coupon/entities/coupon.entity");
const swagger_1 = require("@nestjs/swagger");
const network_entity_1 = require("../../network/entities/network.entity");
const category_entity_1 = require("../../category/entities/category.entity");
const event_entity_1 = require("../../events/entities/event.entity");
class FAQ {
    question;
    answer;
}
exports.FAQ = FAQ;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The question for the FAQ',
        example: 'How do I return an item?'
    }),
    __metadata("design:type", String)
], FAQ.prototype, "question", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The answer to the FAQ question',
        example: 'You can return items within 30 days of purchase by visiting our returns page.'
    }),
    __metadata("design:type", String)
], FAQ.prototype, "answer", void 0);
let Store = class Store {
    id;
    name;
    secondaryName;
    headingH1;
    headingH2;
    storeId;
    storeUrl;
    network;
    htmlCode;
    impressionCode;
    storeTitle;
    categories;
    isPopularStore;
    isFeatureStore;
    isCategoryFeatureStore;
    logoUrl;
    thumbnailUrl;
    isActive;
    metaDescription;
    storeDescription;
    storeArticle;
    faqs;
    createdAt;
    updatedAt;
    user;
    userId;
    products;
    coupons;
    networkEntity;
    networkId;
    category;
    categoryId;
    events;
};
exports.Store = Store;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier for the store',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Store.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name of the store',
        example: 'My Awesome Store'
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Store.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Secondary name or tagline for the store',
        example: 'Best Deals Online',
        nullable: true
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Store.prototype, "secondaryName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Primary heading for the store page',
        example: 'Welcome to Our Store',
        nullable: true
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Store.prototype, "headingH1", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Secondary heading for the store page',
        example: 'Find the Best Deals',
        nullable: true
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Store.prototype, "headingH2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier for the store in the system',
        example: 'store-123',
        nullable: true
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Store.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL of the store website',
        example: 'https://www.mystore.com',
        nullable: true
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Store.prototype, "storeUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Network the store belongs to',
        example: 'Retail Network',
        nullable: true
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Store.prototype, "network", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'HTML code for embedding store content',
        example: '<div class="store-embed">Store content</div>',
        nullable: true
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Store.prototype, "htmlCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Code for tracking impressions',
        example: '<script>trackImpression("store-123")</script>',
        nullable: true
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Store.prototype, "impressionCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Title for the store page',
        example: 'My Store - Best Deals Online',
        nullable: true
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Store.prototype, "storeTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Categories the store belongs to',
        example: ['Electronics', 'Home Appliances', 'Gadgets'],
        nullable: true,
        type: [String]
    }),
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], Store.prototype, "categories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag indicating if this is a popular store',
        example: true,
        default: false
    }),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Store.prototype, "isPopularStore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag indicating if this is a featured store',
        example: false,
        default: false
    }),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Store.prototype, "isFeatureStore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag indicating if this is a category featured store',
        example: true,
        default: false
    }),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Store.prototype, "isCategoryFeatureStore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL to the store logo image',
        example: 'https://example.com/store-logo.png',
        nullable: true
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Store.prototype, "logoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL to the store thumbnail image',
        example: 'https://example.com/store-thumbnail.png',
        nullable: true
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Store.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag indicating if the store is active',
        example: true,
        default: true
    }),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Store.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Meta description for SEO',
        example: 'Find the best deals at My Awesome Store. Shop now for exclusive offers.',
        nullable: true
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Store.prototype, "metaDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Store description for SEO',
        example: 'My Awesome Store offers a wide range of products at competitive prices.',
        nullable: true
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Store.prototype, "storeDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'HTML content for the store article/description',
        example: '<p>Welcome to our store. We offer the best products...</p>',
        nullable: true
    }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Store.prototype, "storeArticle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Frequently Asked Questions for the store',
        example: [
            {
                question: 'How do I return an item?',
                answer: 'You can return items within 30 days of purchase by visiting our returns page.'
            },
            {
                question: 'Do you offer international shipping?',
                answer: 'Yes, we ship to most countries worldwide. Shipping costs vary by location.'
            }
        ],
        nullable: true,
        type: [FAQ]
    }),
    (0, typeorm_1.Column)('json', { nullable: true, default: '[]' }),
    __metadata("design:type", Array)
], Store.prototype, "faqs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when the store was created',
        example: '2023-01-01T00:00:00Z'
    }),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Store.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when the store was last updated',
        example: '2023-01-02T00:00:00Z'
    }),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Store.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.stores),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], Store.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the user who owns this store',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Store.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.Product, product => product.store),
    __metadata("design:type", Array)
], Store.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => coupon_entity_1.Coupon, coupon => coupon.store),
    __metadata("design:type", Array)
], Store.prototype, "coupons", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => network_entity_1.Network, (network) => network.stores, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'networkId' }),
    __metadata("design:type", network_entity_1.Network)
], Store.prototype, "networkEntity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Store.prototype, "networkId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, category => category.stores),
    (0, typeorm_1.JoinColumn)({ name: 'categoryId' }),
    __metadata("design:type", category_entity_1.Category)
], Store.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Store.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'List of events this store is part of' }),
    (0, typeorm_1.ManyToMany)(() => event_entity_1.Event, (event) => event.stores),
    __metadata("design:type", Array)
], Store.prototype, "events", void 0);
exports.Store = Store = __decorate([
    (0, typeorm_1.Entity)()
], Store);
//# sourceMappingURL=store.entity.js.map
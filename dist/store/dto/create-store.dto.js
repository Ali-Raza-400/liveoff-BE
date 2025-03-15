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
exports.CreateStoreDto = exports.FAQDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class FAQDto {
    question;
    answer;
}
exports.FAQDto = FAQDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The question for the FAQ',
        example: 'How do I return an item?'
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FAQDto.prototype, "question", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The answer to the FAQ question',
        example: 'You can return items within 30 days of purchase by visiting our returns page.'
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FAQDto.prototype, "answer", void 0);
class CreateStoreDto {
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
    eventIds;
}
exports.CreateStoreDto = CreateStoreDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name of the store',
        example: 'My Awesome Store'
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStoreDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Secondary name or tagline for the store',
        example: 'Best Deals Online',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStoreDto.prototype, "secondaryName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Primary heading for the store page',
        example: 'Welcome to Our Store',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStoreDto.prototype, "headingH1", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Secondary heading for the store page',
        example: 'Find the Best Deals',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStoreDto.prototype, "headingH2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier for the store in the system',
        example: 'store-123',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStoreDto.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL of the store website',
        example: 'https://www.mystore.com',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateStoreDto.prototype, "storeUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Network the store belongs to',
        example: 'Retail Network',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStoreDto.prototype, "network", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'HTML code for embedding store content',
        example: '<div class="store-embed">Store content</div>',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStoreDto.prototype, "htmlCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Code for tracking impressions',
        example: '<script>trackImpression("store-123")</script>',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStoreDto.prototype, "impressionCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Title for the store page',
        example: 'My Store - Best Deals Online',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStoreDto.prototype, "storeTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Categories the store belongs to',
        example: ['Electronics', 'Home Appliances', 'Gadgets'],
        required: false,
        type: [String]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateStoreDto.prototype, "categories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag indicating if this is a popular store',
        example: true,
        required: false,
        default: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateStoreDto.prototype, "isPopularStore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag indicating if this is a featured store',
        example: false,
        required: false,
        default: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateStoreDto.prototype, "isFeatureStore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag indicating if this is a category featured store',
        example: true,
        required: false,
        default: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateStoreDto.prototype, "isCategoryFeatureStore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL to the store logo image',
        example: 'https://example.com/store-logo.png',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStoreDto.prototype, "logoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL to the store thumbnail image',
        example: 'https://example.com/store-thumbnail.png',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStoreDto.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag indicating if the store is active',
        example: true,
        required: false,
        default: true
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateStoreDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Meta description for SEO',
        example: 'Find the best deals at My Awesome Store. Shop now for exclusive offers.',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStoreDto.prototype, "metaDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Store description for SEO',
        example: 'My Awesome Store offers a wide range of products at competitive prices.',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStoreDto.prototype, "storeDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'HTML content for the store article/description',
        example: '<p>Welcome to our store. We offer the best products...</p>',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStoreDto.prototype, "storeArticle", void 0);
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
        required: false,
        type: [FAQDto]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => FAQDto),
    __metadata("design:type", Array)
], CreateStoreDto.prototype, "faqs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'List of event IDs', isArray: true }),
    (0, class_validator_1.IsUUID)(undefined, { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateStoreDto.prototype, "eventIds", void 0);
//# sourceMappingURL=create-store.dto.js.map
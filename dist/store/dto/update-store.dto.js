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
exports.UpdateStoreDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const swagger_1 = require("@nestjs/swagger");
const create_store_dto_1 = require("./create-store.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class UpdateStoreDto extends (0, mapped_types_1.PartialType)(create_store_dto_1.CreateStoreDto) {
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
    faqs;
}
exports.UpdateStoreDto = UpdateStoreDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'The name of the store',
        example: 'My Awesome Store'
    }),
    __metadata("design:type", String)
], UpdateStoreDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Secondary name or tagline for the store',
        example: 'Best Deals Online'
    }),
    __metadata("design:type", String)
], UpdateStoreDto.prototype, "secondaryName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Primary heading for the store page',
        example: 'Welcome to Our Store'
    }),
    __metadata("design:type", String)
], UpdateStoreDto.prototype, "headingH1", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Secondary heading for the store page',
        example: 'Find the Best Deals'
    }),
    __metadata("design:type", String)
], UpdateStoreDto.prototype, "headingH2", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Unique identifier for the store in the system',
        example: 'store-123'
    }),
    __metadata("design:type", String)
], UpdateStoreDto.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'URL of the store website',
        example: 'https://www.mystore.com'
    }),
    __metadata("design:type", String)
], UpdateStoreDto.prototype, "storeUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Network the store belongs to',
        example: 'Retail Network'
    }),
    __metadata("design:type", String)
], UpdateStoreDto.prototype, "network", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'HTML code for embedding store content',
        example: '<div class="store-embed">Store content</div>'
    }),
    __metadata("design:type", String)
], UpdateStoreDto.prototype, "htmlCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Code for tracking impressions',
        example: '<script>trackImpression("store-123")</script>'
    }),
    __metadata("design:type", String)
], UpdateStoreDto.prototype, "impressionCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Title for the store page',
        example: 'My Store - Best Deals Online'
    }),
    __metadata("design:type", String)
], UpdateStoreDto.prototype, "storeTitle", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Categories the store belongs to',
        example: ['Electronics', 'Home Appliances', 'Gadgets'],
        type: [String]
    }),
    __metadata("design:type", Array)
], UpdateStoreDto.prototype, "categories", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Flag indicating if this is a popular store',
        example: true
    }),
    __metadata("design:type", Boolean)
], UpdateStoreDto.prototype, "isPopularStore", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Flag indicating if this is a featured store',
        example: false
    }),
    __metadata("design:type", Boolean)
], UpdateStoreDto.prototype, "isFeatureStore", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Flag indicating if this is a category featured store',
        example: true
    }),
    __metadata("design:type", Boolean)
], UpdateStoreDto.prototype, "isCategoryFeatureStore", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'URL to the store logo image',
        example: 'https://example.com/store-logo.png'
    }),
    __metadata("design:type", String)
], UpdateStoreDto.prototype, "logoUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'URL to the store thumbnail image',
        example: 'https://example.com/store-thumbnail.png'
    }),
    __metadata("design:type", String)
], UpdateStoreDto.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Flag indicating if the store is active',
        example: true,
        default: true
    }),
    __metadata("design:type", Boolean)
], UpdateStoreDto.prototype, "isActive", void 0);
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
        type: [create_store_dto_1.FAQDto]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_store_dto_1.FAQDto),
    __metadata("design:type", Array)
], UpdateStoreDto.prototype, "faqs", void 0);
//# sourceMappingURL=update-store.dto.js.map
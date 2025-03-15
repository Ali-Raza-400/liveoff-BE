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
exports.CouponResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CouponResponseDto {
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
    store;
    products;
    static fromEntity(coupon) {
        const dto = new CouponResponseDto();
        dto.id = coupon.id;
        dto.name = coupon.name;
        dto.detail = coupon.detail;
        dto.code = coupon.code;
        dto.htmlCodeUrl = coupon.htmlCodeUrl;
        dto.startDate = coupon.startDate;
        dto.endDate = coupon.endDate;
        dto.category = coupon.category;
        dto.rank = coupon.rank;
        dto.isFreeShipping = coupon.isFreeShipping;
        dto.isExclusive = coupon.isExclusive;
        dto.isVerified = coupon.isVerified;
        dto.showOnHomePage = coupon.showOnHomePage;
        dto.isTopCategory = coupon.isTopCategory;
        dto.mainImage = coupon.mainImage;
        dto.secondaryImage = coupon.secondaryImage;
        dto.codeImage = coupon.codeImage;
        dto.isActive = coupon.isActive;
        dto.createdAt = coupon.createdAt;
        dto.updatedAt = coupon.updatedAt;
        dto.storeId = coupon.storeId;
        if (coupon.store) {
            dto.store = {
                id: coupon.store.id,
                name: coupon.store.name,
                logoUrl: coupon.store.logoUrl
            };
        }
        if (coupon.products && coupon.products.length > 0) {
            dto.products = coupon.products.map(product => ({
                id: product.id,
                name: product.name,
                currentPrice: Number(product.currentPrice),
                imageUrl: product.imageUrl
            }));
        }
        return dto;
    }
}
exports.CouponResponseDto = CouponResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier for the coupon',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __metadata("design:type", String)
], CouponResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name of the coupon',
        example: '€350 De Reduction Promo'
    }),
    __metadata("design:type", String)
], CouponResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Detailed description of the coupon',
        example: 'Christmas Sale! Get up to €350 off on your purchase when you shop through this landing page.'
    }),
    __metadata("design:type", String)
], CouponResponseDto.prototype, "detail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The coupon code',
        example: 'SAVE350',
        nullable: true
    }),
    __metadata("design:type", Object)
], CouponResponseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'HTML code URL for the coupon',
        example: 'https://clk.tradedoubler.com/click?p=311962&a=3237124&url=https%3A%2F%2Fr.donner-music.com',
        nullable: true
    }),
    __metadata("design:type", Object)
], CouponResponseDto.prototype, "htmlCodeUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Start date of the coupon validity',
        example: '2023-12-01T00:00:00Z'
    }),
    __metadata("design:type", Date)
], CouponResponseDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'End date of the coupon validity',
        example: '2023-12-31T23:59:59Z'
    }),
    __metadata("design:type", Date)
], CouponResponseDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Category of the coupon',
        example: 'Electronics'
    }),
    __metadata("design:type", String)
], CouponResponseDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Rank of the coupon for sorting',
        example: 2
    }),
    __metadata("design:type", Number)
], CouponResponseDto.prototype, "rank", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag indicating if this is a free shipping coupon',
        example: false
    }),
    __metadata("design:type", Boolean)
], CouponResponseDto.prototype, "isFreeShipping", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag indicating if this coupon is exclusive',
        example: false
    }),
    __metadata("design:type", Boolean)
], CouponResponseDto.prototype, "isExclusive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag indicating if this coupon is verified',
        example: true
    }),
    __metadata("design:type", Boolean)
], CouponResponseDto.prototype, "isVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag indicating if this coupon should be shown on the home page',
        example: false
    }),
    __metadata("design:type", Boolean)
], CouponResponseDto.prototype, "showOnHomePage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag indicating if this coupon is a top category coupon',
        example: false
    }),
    __metadata("design:type", Boolean)
], CouponResponseDto.prototype, "isTopCategory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Main image for the coupon',
        example: '€350',
        nullable: true
    }),
    __metadata("design:type", Object)
], CouponResponseDto.prototype, "mainImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Secondary image for the coupon',
        example: 'De Reduction',
        nullable: true
    }),
    __metadata("design:type", Object)
], CouponResponseDto.prototype, "secondaryImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Code image for the coupon',
        example: 'Code',
        nullable: true
    }),
    __metadata("design:type", Object)
], CouponResponseDto.prototype, "codeImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag indicating if the coupon is active',
        example: true
    }),
    __metadata("design:type", Boolean)
], CouponResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when the coupon was created',
        example: '2023-01-01T00:00:00Z'
    }),
    __metadata("design:type", Date)
], CouponResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when the coupon was last updated',
        example: '2023-01-02T00:00:00Z'
    }),
    __metadata("design:type", Date)
], CouponResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the store this coupon belongs to',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __metadata("design:type", String)
], CouponResponseDto.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Store information',
        nullable: true
    }),
    __metadata("design:type", Object)
], CouponResponseDto.prototype, "store", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Products associated with this coupon',
        type: Array,
        nullable: true
    }),
    __metadata("design:type", Array)
], CouponResponseDto.prototype, "products", void 0);
//# sourceMappingURL=coupon-response.dto.js.map
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
exports.CreateCouponDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateCouponDto {
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
    storeId;
    productIds;
    eventIds;
}
exports.CreateCouponDto = CreateCouponDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name of the coupon',
        example: '€350 De Reduction Promo'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCouponDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Detailed description of the coupon',
        example: 'Christmas Sale! Get up to €350 off on your purchase when you shop through this landing page.'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCouponDto.prototype, "detail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The coupon code',
        example: 'SAVE350',
        required: false
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCouponDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'HTML code URL for the coupon',
        example: 'https://clk.tradedoubler.com/click?p=311962&a=3237124&url=https%3A%2F%2Fr.donner-music.com',
        required: false
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCouponDto.prototype, "htmlCodeUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Start date of the coupon validity',
        example: '2023-12-01T00:00:00Z'
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCouponDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'End date of the coupon validity',
        example: '2023-12-31T23:59:59Z'
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCouponDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Category of the coupon',
        example: 'Electronics'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCouponDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Rank of the coupon for sorting',
        example: 2,
        required: false,
        default: 0
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateCouponDto.prototype, "rank", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag indicating if this is a free shipping coupon',
        example: false,
        required: false,
        default: false
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateCouponDto.prototype, "isFreeShipping", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag indicating if this coupon is exclusive',
        example: false,
        required: false,
        default: false
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateCouponDto.prototype, "isExclusive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag indicating if this coupon is verified',
        example: true,
        required: false,
        default: false
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateCouponDto.prototype, "isVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag indicating if this coupon should be shown on the home page',
        example: false,
        required: false,
        default: false
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateCouponDto.prototype, "showOnHomePage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag indicating if this coupon is a top category coupon',
        example: false,
        required: false,
        default: false
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateCouponDto.prototype, "isTopCategory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Main image for the coupon',
        example: '€350',
        required: false
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCouponDto.prototype, "mainImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Secondary image for the coupon',
        example: 'De Reduction',
        required: false
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCouponDto.prototype, "secondaryImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Code image for the coupon',
        example: 'Code',
        required: false
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCouponDto.prototype, "codeImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flag indicating if the coupon is active',
        example: true,
        required: false,
        default: true
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateCouponDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the store this coupon belongs to',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCouponDto.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of product IDs this coupon applies to',
        example: ['123e4567-e89b-12d3-a456-426614174000', '223e4567-e89b-12d3-a456-426614174001'],
        required: false,
        type: [String]
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateCouponDto.prototype, "productIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'List of associated event IDs', isArray: true }),
    (0, class_validator_1.IsUUID)(undefined, { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateCouponDto.prototype, "eventIds", void 0);
//# sourceMappingURL=create-coupon.dto.js.map
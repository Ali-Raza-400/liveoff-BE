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
exports.EventDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class EventDto {
    title;
    descriptionHeading;
    description;
    extraDescriptionHeading;
    extraDescriptionContent;
    startDate;
    endDate;
    bannerImage;
    metaDescription;
    seoKeywords;
    isFeatured;
    isTrending;
    viewCount;
    termsAndConditions;
    storeIds;
    couponIds;
}
exports.EventDto = EventDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Title of the event', example: 'Christmas Deals 2025' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EventDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Event heading for the first description section', example: 'Christmas Deals 2025' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EventDto.prototype, "descriptionHeading", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Main event description', example: 'Undoubtedly the biggest shopping holiday...' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EventDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Additional heading for extended event details', example: 'What Does Size-Inclusive Mean?' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EventDto.prototype, "extraDescriptionHeading", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Extra content section for the event', example: 'If savings are in, we predict that you will succeed...' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EventDto.prototype, "extraDescriptionContent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Event start date', example: '2025-12-01T00:00:00Z' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], EventDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Event end date', example: '2025-12-31T23:59:59Z' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], EventDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Event banner image URL', required: false, example: 'https://example.com/banner.jpg' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EventDto.prototype, "bannerImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'SEO meta description', required: false, example: 'Get the best Christmas deals of 2025' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EventDto.prototype, "metaDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'SEO keywords', required: false, example: ['Christmas Deals', 'Best Offers', 'Holiday Discounts'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], EventDto.prototype, "seoKeywords", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Indicates whether the event is featured on the homepage', required: false, example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], EventDto.prototype, "isFeatured", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Indicates whether the event is trending based on popularity', required: false, example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], EventDto.prototype, "isTrending", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total number of views for the event', required: false, example: 5000 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EventDto.prototype, "viewCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Terms and conditions related to the event', required: false, example: 'Limited to the first 500 customers' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EventDto.prototype, "termsAndConditions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'List of associated store IDs', type: [String], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    __metadata("design:type", Array)
], EventDto.prototype, "storeIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'List of associated coupon IDs', type: [String], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUUID)('4', { each: true }),
    __metadata("design:type", Array)
], EventDto.prototype, "couponIds", void 0);
//# sourceMappingURL=create-event.dto.js.map
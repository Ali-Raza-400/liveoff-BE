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
exports.Event = void 0;
const typeorm_1 = require("typeorm");
const store_entity_1 = require("../../store/entities/store.entity");
const coupon_entity_1 = require("../../coupon/entities/coupon.entity");
const swagger_1 = require("@nestjs/swagger");
let Event = class Event {
    id;
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
    stores;
    coupons;
    createdAt;
    updatedAt;
};
exports.Event = Event;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier for the event' }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Event.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Title of the event', example: 'Christmas Deals 2025' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Event.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Event heading for the first description section', example: 'Christmas Deals 2025' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "descriptionHeading", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Main event description', example: 'Undoubtedly the biggest shopping holiday...' }),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Event.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Additional heading for extended event details', example: 'What Does Size-Inclusive Mean?' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "extraDescriptionHeading", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Extra content section for the event', example: 'If savings are in, we predict that you will succeed...' }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "extraDescriptionContent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Event start date', example: '2025-12-01T00:00:00Z' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Event.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Event end date', example: '2025-12-31T23:59:59Z' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Event.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Event banner image URL', example: 'https://example.com/banner.jpg' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "bannerImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'SEO meta description for search engines', example: 'Get the best Christmas deals of 2025' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "metaDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'SEO keywords for better search visibility', example: ['Christmas Deals', 'Best Offers', 'Holiday Discounts'] }),
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], Event.prototype, "seoKeywords", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Indicates whether the event is featured on the homepage', example: true }),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Event.prototype, "isFeatured", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Indicates whether the event is trending based on popularity', example: true }),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Event.prototype, "isTrending", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total number of views for the event', example: 5000 }),
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Event.prototype, "viewCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Terms and conditions related to the event', example: 'Limited to the first 500 customers' }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Event.prototype, "termsAndConditions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'List of associated stores' }),
    (0, typeorm_1.ManyToMany)(() => store_entity_1.Store, (store) => store.events),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Event.prototype, "stores", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'List of associated coupons' }),
    (0, typeorm_1.ManyToMany)(() => coupon_entity_1.Coupon, (coupon) => coupon.events),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Event.prototype, "coupons", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Event creation timestamp', example: '2025-03-14T15:17:48.987Z' }),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Event.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last update timestamp for the event', example: '2025-03-14T15:17:48.987Z' }),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Event.prototype, "updatedAt", void 0);
exports.Event = Event = __decorate([
    (0, typeorm_1.Entity)()
], Event);
//# sourceMappingURL=event.entity.js.map
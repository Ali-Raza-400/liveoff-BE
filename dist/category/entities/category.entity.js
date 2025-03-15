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
exports.Category = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const store_entity_1 = require("../../store/entities/store.entity");
const product_entity_1 = require("../../product/entities/product.entity");
const coupon_entity_1 = require("../../coupon/entities/coupon.entity");
const network_entity_1 = require("../../network/entities/network.entity");
const blog_entity_1 = require("../../blogs/entities/blog.entity");
let Category = class Category {
    id;
    categoryName;
    categoryTitle;
    categoryDescription;
    image;
    createdAt;
    updatedAt;
    networks;
    stores;
    products;
    coupons;
    blogs;
};
exports.Category = Category;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier for the category' }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Category.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Name of the category' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Category.prototype, "categoryName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Title of the category' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Category.prototype, "categoryTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description of the category', nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Category.prototype, "categoryDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Image URL of the category', nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Category.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Category.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Category.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => network_entity_1.Network, network => network.category),
    __metadata("design:type", Array)
], Category.prototype, "networks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => store_entity_1.Store, store => store.category),
    __metadata("design:type", Array)
], Category.prototype, "stores", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.Product, product => product.categoryEntity),
    __metadata("design:type", Array)
], Category.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => coupon_entity_1.Coupon, coupon => coupon.categoryEntity),
    __metadata("design:type", Array)
], Category.prototype, "coupons", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => blog_entity_1.Blog, blog => blog.category),
    __metadata("design:type", Array)
], Category.prototype, "blogs", void 0);
exports.Category = Category = __decorate([
    (0, typeorm_1.Entity)()
], Category);
//# sourceMappingURL=category.entity.js.map
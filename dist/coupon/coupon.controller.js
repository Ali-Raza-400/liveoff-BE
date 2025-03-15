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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponController = void 0;
const common_1 = require("@nestjs/common");
const coupon_service_1 = require("./coupon.service");
const create_coupon_dto_1 = require("./dto/create-coupon.dto");
const update_coupon_dto_1 = require("./dto/update-coupon.dto");
const coupon_response_dto_1 = require("./dto/coupon-response.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
let CouponController = class CouponController {
    couponService;
    constructor(couponService) {
        this.couponService = couponService;
    }
    create(createCouponDto, req) {
        return this.couponService.create(createCouponDto, req.user.id);
    }
    findAll(storeId, isActive, category, isVerified) {
        return this.couponService.findAll(storeId, isActive, category, isVerified);
    }
    findOne(id) {
        return this.couponService.findOne(id);
    }
    update(id, updateCouponDto, req) {
        return this.couponService.update(id, updateCouponDto, req.user.id);
    }
    remove(id) {
        return this.couponService.remove(id);
    }
    findByStore(storeId) {
        return this.couponService.findByStore(storeId);
    }
    findByProduct(productId) {
        return this.couponService.findByProduct(productId);
    }
    findActiveAndValid() {
        return this.couponService.findActiveAndValid();
    }
    async getCouponCount() {
        return this.couponService.getCouponCount();
    }
};
exports.CouponController = CouponController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new coupon' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The coupon has been successfully created.',
        type: coupon_response_dto_1.CouponResponseDto
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    (0, swagger_1.ApiBody)({ type: create_coupon_dto_1.CreateCouponDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_coupon_dto_1.CreateCouponDto, Object]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all coupons with optional filters' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return all coupons matching the criteria.',
        type: [coupon_response_dto_1.CouponResponseDto]
    }),
    (0, swagger_1.ApiQuery)({ name: 'storeId', required: false, description: 'Filter by store ID' }),
    (0, swagger_1.ApiQuery)({ name: 'isActive', required: false, description: 'Filter by active status' }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false, description: 'Filter by category' }),
    (0, swagger_1.ApiQuery)({ name: 'isVerified', required: false, description: 'Filter by verification status' }),
    __param(0, (0, common_1.Query)('storeId')),
    __param(1, (0, common_1.Query)('isActive')),
    __param(2, (0, common_1.Query)('category')),
    __param(3, (0, common_1.Query)('isVerified')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean, String, Boolean]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a coupon by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return the coupon with the specified ID.',
        type: coupon_response_dto_1.CouponResponseDto
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Coupon not found.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Coupon ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a coupon' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The coupon has been successfully updated.',
        type: coupon_response_dto_1.CouponResponseDto
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Coupon not found.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Coupon ID' }),
    (0, swagger_1.ApiBody)({ type: update_coupon_dto_1.UpdateCouponDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_coupon_dto_1.UpdateCouponDto, Object]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a coupon' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'The coupon has been successfully deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Coupon not found.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Coupon ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('store/:storeId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all coupons for a specific store' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return all coupons for the specified store.',
        type: [coupon_response_dto_1.CouponResponseDto]
    }),
    (0, swagger_1.ApiParam)({ name: 'storeId', description: 'Store ID' }),
    __param(0, (0, common_1.Param)('storeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "findByStore", null);
__decorate([
    (0, common_1.Get)('product/:productId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all coupons for a specific product' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return all coupons for the specified product.',
        type: [coupon_response_dto_1.CouponResponseDto]
    }),
    (0, swagger_1.ApiParam)({ name: 'productId', description: 'Product ID' }),
    __param(0, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "findByProduct", null);
__decorate([
    (0, common_1.Get)('active/valid'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active and valid coupons' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return all active and valid coupons.',
        type: [coupon_response_dto_1.CouponResponseDto]
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "findActiveAndValid", null);
__decorate([
    (0, common_1.Get)('stats/count'),
    (0, swagger_1.ApiOperation)({ summary: 'Get coupon count' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Coupon count fetched successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "getCouponCount", null);
exports.CouponController = CouponController = __decorate([
    (0, swagger_1.ApiTags)('coupons'),
    (0, common_1.Controller)('coupons'),
    __metadata("design:paramtypes", [coupon_service_1.CouponService])
], CouponController);
//# sourceMappingURL=coupon.controller.js.map
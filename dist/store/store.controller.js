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
exports.StoreController = void 0;
const common_1 = require("@nestjs/common");
const store_service_1 = require("./store.service");
const create_store_dto_1 = require("./dto/create-store.dto");
const update_store_dto_1 = require("./dto/update-store.dto");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const role_guard_1 = require("../guards/role.guard");
const role_decorator_1 = require("../custom-decorators/role_decorator");
const role_enum_1 = require("../user/enums/role.enum");
const swagger_1 = require("@nestjs/swagger");
const store_entity_1 = require("./entities/store.entity");
let StoreController = class StoreController {
    storeService;
    constructor(storeService) {
        this.storeService = storeService;
    }
    create(createStoreDto, req) {
        return this.storeService.create(createStoreDto, req.user.id);
    }
    findAll() {
        return this.storeService.findAll();
    }
    findMyStores(req) {
        return this.storeService.findAllByUser(req.user.id);
    }
    async findOne(id, req) {
        const store = await this.storeService.findOne(id);
        if (req.user.role !== 'admin' && store.userId !== req.user.id) {
            throw new common_1.ForbiddenException('You do not have permission to access this store');
        }
        return store;
    }
    update(id, updateStoreDto, req) {
        return this.storeService.update(id, updateStoreDto, req.user.id, req.user.role);
    }
    remove(id, req) {
        return this.storeService.remove(id, req.user.id, req.user.role);
    }
    async getStoreCount() {
        return this.storeService.getStoreCount();
    }
    async getStoreWithCouponsAndProducts(storeId) {
        return this.storeService.getStoreWithCouponsAndProducts(storeId);
    }
};
exports.StoreController = StoreController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new store' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The store has been successfully created.',
        type: store_entity_1.Store
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    (0, swagger_1.ApiBody)({ type: create_store_dto_1.CreateStoreDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_store_dto_1.CreateStoreDto, Object]),
    __metadata("design:returntype", void 0)
], StoreController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get all stores (admin only)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return all stores.',
        type: [store_entity_1.Store]
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - requires admin role.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StoreController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('my-stores'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get all stores owned by the current user' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return all stores owned by the current user.',
        type: [store_entity_1.Store]
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StoreController.prototype, "findMyStores", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get a store by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Store ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return the store with the specified ID.',
        type: store_entity_1.Store
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - user does not have permission to access this store.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Store not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Update a store' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Store ID' }),
    (0, swagger_1.ApiBody)({ type: update_store_dto_1.UpdateStoreDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The store has been successfully updated.',
        type: store_entity_1.Store
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - user does not have permission to update this store.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Store not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_store_dto_1.UpdateStoreDto, Object]),
    __metadata("design:returntype", void 0)
], StoreController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a store' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Store ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The store has been successfully deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - user does not have permission to delete this store.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Store not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], StoreController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('stats/count'),
    (0, swagger_1.ApiOperation)({ summary: 'Get store count' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Store count fetched successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "getStoreCount", null);
__decorate([
    (0, common_1.Get)('coupon-product/:storeId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get store details along with associated coupons and products' }),
    (0, swagger_1.ApiParam)({ name: 'storeId', description: 'Store ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Store with coupons and products returned successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Store not found' }),
    __param(0, (0, common_1.Param)('storeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "getStoreWithCouponsAndProducts", null);
exports.StoreController = StoreController = __decorate([
    (0, swagger_1.ApiTags)('stores'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('store'),
    __metadata("design:paramtypes", [store_service_1.StoreService])
], StoreController);
//# sourceMappingURL=store.controller.js.map
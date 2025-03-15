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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
const store_service_1 = require("../store/store.service");
let ProductService = class ProductService {
    productRepository;
    storeService;
    constructor(productRepository, storeService) {
        this.productRepository = productRepository;
        this.storeService = storeService;
    }
    async create(createProductDto, userId) {
        const store = await this.storeService.findOne(createProductDto.storeId);
        if (store.userId !== userId) {
            throw new common_1.ForbiddenException('You do not have permission to add products to this store');
        }
        const product = this.productRepository.create({
            ...createProductDto,
            userId,
        });
        return this.productRepository.save(product);
    }
    async findAll() {
        return this.productRepository.find({
            relations: ['store', 'user'],
        });
    }
    async findAllByStore(storeId) {
        return this.productRepository.find({
            where: { storeId, isActive: true },
            relations: ['store', 'user'],
        });
    }
    async findAllByUser(userId) {
        return this.productRepository.find({
            where: { userId },
            relations: ['store', 'user'],
        });
    }
    async findOne(id) {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['store', 'user'],
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }
    async update(id, updateProductDto, userId, userRole) {
        const product = await this.findOne(id);
        if (product.userId !== userId && userRole !== 'admin') {
            throw new common_1.ForbiddenException('You do not have permission to update this product');
        }
        if (updateProductDto.storeId && updateProductDto.storeId !== product.storeId) {
            const newStore = await this.storeService.findOne(updateProductDto.storeId);
            if (newStore.userId !== userId && userRole !== 'admin') {
                throw new common_1.ForbiddenException('You do not have permission to move this product to the specified store');
            }
        }
        await this.productRepository.update(id, updateProductDto);
        return this.findOne(id);
    }
    async remove(id, userId, userRole) {
        const product = await this.findOne(id);
        if (product.userId !== userId && userRole !== 'admin') {
            throw new common_1.ForbiddenException('You do not have permission to delete this product');
        }
        await this.productRepository.delete(id);
    }
    async findFeaturedProducts() {
        return this.productRepository.find({
            where: { isFeatured: true, isActive: true },
            relations: ['store'],
        });
    }
    async findProductsByCategory(category) {
        return this.productRepository.find({
            where: { category, isActive: true },
            relations: ['store'],
        });
    }
    async getProductCount() {
        const count = await this.productRepository.count();
        return { count };
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        store_service_1.StoreService])
], ProductService);
//# sourceMappingURL=product.service.js.map
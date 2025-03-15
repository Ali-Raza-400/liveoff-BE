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
exports.CouponService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const coupon_entity_1 = require("./entities/coupon.entity");
const coupon_response_dto_1 = require("./dto/coupon-response.dto");
const product_entity_1 = require("../product/entities/product.entity");
const store_entity_1 = require("../store/entities/store.entity");
let CouponService = class CouponService {
    couponRepository;
    productRepository;
    storeRepository;
    constructor(couponRepository, productRepository, storeRepository) {
        this.couponRepository = couponRepository;
        this.productRepository = productRepository;
        this.storeRepository = storeRepository;
    }
    async create(createCouponDto, userId) {
        const store = await this.storeRepository.findOne({ where: { id: createCouponDto.storeId } });
        if (!store) {
            throw new common_1.BadRequestException(`Store with ID ${createCouponDto.storeId} not found`);
        }
        const coupon = this.couponRepository.create({
            ...createCouponDto,
            userId,
            startDate: new Date(createCouponDto.startDate),
            endDate: new Date(createCouponDto.endDate),
        });
        if (createCouponDto.productIds && createCouponDto.productIds.length > 0) {
            const products = await this.productRepository.find({
                where: { id: (0, typeorm_2.In)(createCouponDto.productIds) }
            });
            if (products.length !== createCouponDto.productIds.length) {
                throw new common_1.BadRequestException('One or more product IDs are invalid');
            }
            coupon.products = products;
        }
        const savedCoupon = await this.couponRepository.save(coupon);
        return coupon_response_dto_1.CouponResponseDto.fromEntity(savedCoupon);
    }
    async findAll(storeId, isActive, category, isVerified) {
        const queryBuilder = this.couponRepository.createQueryBuilder('coupon')
            .leftJoinAndSelect('coupon.store', 'store')
            .leftJoinAndSelect('coupon.products', 'products');
        if (storeId) {
            queryBuilder.andWhere('coupon.storeId = :storeId', { storeId });
        }
        if (isActive !== undefined) {
            queryBuilder.andWhere('coupon.isActive = :isActive', { isActive });
        }
        if (category) {
            queryBuilder.andWhere('coupon.category = :category', { category });
        }
        if (isVerified !== undefined) {
            queryBuilder.andWhere('coupon.isVerified = :isVerified', { isVerified });
        }
        queryBuilder.orderBy('coupon.rank', 'DESC')
            .addOrderBy('coupon.createdAt', 'DESC');
        const coupons = await queryBuilder.getMany();
        return coupons.map(coupon => coupon_response_dto_1.CouponResponseDto.fromEntity(coupon));
    }
    async findOne(id) {
        const coupon = await this.couponRepository.findOne({
            where: { id },
            relations: ['store', 'products']
        });
        if (!coupon) {
            throw new common_1.NotFoundException(`Coupon with ID ${id} not found`);
        }
        return coupon_response_dto_1.CouponResponseDto.fromEntity(coupon);
    }
    async update(id, updateCouponDto, userId) {
        const coupon = await this.couponRepository.findOne({
            where: { id },
            relations: ['products']
        });
        if (!coupon) {
            throw new common_1.NotFoundException(`Coupon with ID ${id} not found`);
        }
        if (updateCouponDto.startDate) {
            updateCouponDto.startDate = new Date(updateCouponDto.startDate).toISOString();
        }
        if (updateCouponDto.endDate) {
            updateCouponDto.endDate = new Date(updateCouponDto.endDate).toISOString();
        }
        if (updateCouponDto.productIds) {
            const products = await this.productRepository.find({
                where: { id: (0, typeorm_2.In)(updateCouponDto.productIds) }
            });
            if (products.length !== updateCouponDto.productIds.length) {
                throw new common_1.BadRequestException('One or more product IDs are invalid');
            }
            coupon.products = products;
            delete updateCouponDto.productIds;
        }
        Object.assign(coupon, updateCouponDto);
        const updatedCoupon = await this.couponRepository.save(coupon);
        return coupon_response_dto_1.CouponResponseDto.fromEntity(updatedCoupon);
    }
    async remove(id) {
        const result = await this.couponRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Coupon with ID ${id} not found`);
        }
    }
    async findByStore(storeId) {
        const coupons = await this.couponRepository.find({
            where: { storeId, isActive: true },
            relations: ['products'],
            order: { rank: 'DESC', createdAt: 'DESC' }
        });
        return coupons.map(coupon => coupon_response_dto_1.CouponResponseDto.fromEntity(coupon));
    }
    async findByProduct(productId) {
        const coupons = await this.couponRepository
            .createQueryBuilder('coupon')
            .innerJoinAndSelect('coupon.products', 'product', 'product.id = :productId', { productId })
            .leftJoinAndSelect('coupon.store', 'store')
            .where('coupon.isActive = :isActive', { isActive: true })
            .orderBy('coupon.rank', 'DESC')
            .addOrderBy('coupon.createdAt', 'DESC')
            .getMany();
        return coupons.map(coupon => coupon_response_dto_1.CouponResponseDto.fromEntity(coupon));
    }
    async findActiveAndValid() {
        const now = new Date();
        const coupons = await this.couponRepository
            .createQueryBuilder('coupon')
            .leftJoinAndSelect('coupon.store', 'store')
            .leftJoinAndSelect('coupon.products', 'products')
            .where('coupon.isActive = :isActive', { isActive: true })
            .andWhere('coupon.startDate <= :now', { now })
            .andWhere('coupon.endDate >= :now', { now })
            .orderBy('coupon.rank', 'DESC')
            .addOrderBy('coupon.createdAt', 'DESC')
            .getMany();
        return coupons.map(coupon => coupon_response_dto_1.CouponResponseDto.fromEntity(coupon));
    }
    async getCouponCount() {
        const count = await this.couponRepository.count();
        return { count };
    }
};
exports.CouponService = CouponService;
exports.CouponService = CouponService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(coupon_entity_1.Coupon)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(2, (0, typeorm_1.InjectRepository)(store_entity_1.Store)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CouponService);
//# sourceMappingURL=coupon.service.js.map
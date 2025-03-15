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
exports.StoreService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const store_entity_1 = require("./entities/store.entity");
let StoreService = class StoreService {
    storeRepository;
    constructor(storeRepository) {
        this.storeRepository = storeRepository;
    }
    async create(createStoreDto, userId) {
        const store = this.storeRepository.create({
            ...createStoreDto,
            userId,
        });
        console.log("store:::", store);
        return this.storeRepository.save(store);
    }
    async findAll() {
        return this.storeRepository.find({
            relations: ['user'],
        });
    }
    async findAllByUser(userId) {
        return this.storeRepository.find({
            where: { userId },
            relations: ['user'],
        });
    }
    async findOne(id) {
        const store = await this.storeRepository.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!store) {
            throw new common_1.NotFoundException(`Store with ID ${id} not found`);
        }
        return store;
    }
    async update(id, updateStoreDto, userId, userRole) {
        const store = await this.findOne(id);
        if (store.userId !== userId && userRole !== 'admin') {
            throw new common_1.ForbiddenException('You do not have permission to update this store');
        }
        await this.storeRepository.update(id, updateStoreDto);
        return this.findOne(id);
    }
    async remove(id, userId, userRole) {
        const store = await this.findOne(id);
        if (store.userId !== userId && userRole !== 'admin') {
            throw new common_1.ForbiddenException('You do not have permission to delete this store');
        }
        await this.storeRepository.delete(id);
    }
    async getStoreCount() {
        const count = await this.storeRepository.count();
        return { count };
    }
    async getStoreWithCouponsAndProducts(storeId) {
        const store = await this.storeRepository.findOne({
            where: { id: storeId },
            relations: ['coupons', 'products'],
        });
        if (!store) {
            throw new common_1.NotFoundException(`Store with ID ${storeId} not found`);
        }
        return {
            store
        };
    }
};
exports.StoreService = StoreService;
exports.StoreService = StoreService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(store_entity_1.Store)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StoreService);
//# sourceMappingURL=store.service.js.map
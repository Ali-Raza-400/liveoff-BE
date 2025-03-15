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
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const coupon_entity_1 = require("../coupon/entities/coupon.entity");
const store_entity_1 = require("../store/entities/store.entity");
const typeorm_2 = require("typeorm");
const event_entity_1 = require("./entities/event.entity");
let EventService = class EventService {
    eventRepository;
    storeRepository;
    couponRepository;
    constructor(eventRepository, storeRepository, couponRepository) {
        this.eventRepository = eventRepository;
        this.storeRepository = storeRepository;
        this.couponRepository = couponRepository;
    }
    async create(createEventDto) {
        const { storeIds, couponIds, ...eventData } = createEventDto;
        const stores = storeIds ? await this.storeRepository.find({ where: { id: (0, typeorm_2.In)(storeIds) } }) : [];
        const coupons = couponIds ? await this.couponRepository.find({ where: { id: (0, typeorm_2.In)(couponIds) } }) : [];
        const event = this.eventRepository.create({ ...eventData, stores, coupons });
        return await this.eventRepository.save(event);
    }
    async findAll() {
        return await this.eventRepository.find({ relations: ['stores', 'coupons'] });
    }
    async findOne(id) {
        const event = await this.eventRepository.findOne({ where: { id }, relations: ['stores', 'coupons'] });
        if (!event) {
            throw new common_1.NotFoundException(`Event with ID ${id} not found`);
        }
        return event;
    }
    async update(id, updateEventDto) {
        const { storeIds, couponIds, ...eventData } = updateEventDto;
        const event = await this.findOne(id);
        if (storeIds) {
            event.stores = await this.storeRepository.find({ where: { id: (0, typeorm_2.In)(storeIds) } });
        }
        if (couponIds) {
            event.coupons = await this.couponRepository.find({ where: { id: (0, typeorm_2.In)(couponIds) } });
        }
        Object.assign(event, eventData);
        return await this.eventRepository.save(event);
    }
    async remove(id) {
        const event = await this.findOne(id);
        await this.eventRepository.remove(event);
    }
};
exports.EventService = EventService;
exports.EventService = EventService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __param(1, (0, typeorm_1.InjectRepository)(store_entity_1.Store)),
    __param(2, (0, typeorm_1.InjectRepository)(coupon_entity_1.Coupon)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EventService);
//# sourceMappingURL=events.service.js.map
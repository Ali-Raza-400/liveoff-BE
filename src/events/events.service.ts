import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from 'src/coupon/entities/coupon.entity';
import { Store } from 'src/store/entities/store.entity';
import { Repository, In } from 'typeorm';
import { EventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';


@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Event)
        private readonly eventRepository: Repository<Event>,
        
        @InjectRepository(Store)
        private readonly storeRepository: Repository<Store>,
        
        @InjectRepository(Coupon)
        private readonly couponRepository: Repository<Coupon>,
    ) {}

    async create(createEventDto: EventDto): Promise<Event> {
        const { storeIds, couponIds, ...eventData } = createEventDto;

        const stores = storeIds ? await this.storeRepository.find({ where: { id: In(storeIds) } }) : [];
        const coupons = couponIds ? await this.couponRepository.find({ where: { id: In(couponIds) } }) : [];

        const event = this.eventRepository.create({ ...eventData, stores, coupons });
        return await this.eventRepository.save(event);
    }

    async findAll(): Promise<Event[]> {
        return await this.eventRepository.find({ relations: ['stores', 'coupons'] });
    }

    async findOne(id: string): Promise<Event> {
        const event = await this.eventRepository.findOne({ where: { id }, relations: ['stores', 'coupons'] });
        if (!event) {
            throw new NotFoundException(`Event with ID ${id} not found`);
        }
        return event;
    }

    async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
        const { storeIds, couponIds, ...eventData } = updateEventDto;

        const event = await this.findOne(id);

        if (storeIds) {
            event.stores = await this.storeRepository.find({ where: { id: In(storeIds) } });
        }
        if (couponIds) {
            event.coupons = await this.couponRepository.find({ where: { id: In(couponIds) } });
        }

        Object.assign(event, eventData);
        return await this.eventRepository.save(event);
    }

    async remove(id: string): Promise<void> {
        const event = await this.findOne(id);
        await this.eventRepository.remove(event);
    }
}

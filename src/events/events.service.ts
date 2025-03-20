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

    async findAllWithFilter(filters: {
        name?: string;
        startDate?: string;
        endDate?: string;
        isFeatured?: boolean;
        isTrending?: boolean;
        minViews?: number;
        maxViews?: number;
        page?: number;
        limit?: number;
      }): Promise<any> {
        const query = this.eventRepository.createQueryBuilder('event')
          .leftJoinAndSelect('event.stores', 'stores')
          .leftJoinAndSelect('event.coupons', 'coupons');
      
        if (filters.name) {
          query.andWhere('event.title ILIKE :name', { name: `%${filters.name}%` });
        }
      
        if (filters.startDate) {
          query.andWhere('event.startDate >= :startDate', { startDate: filters.startDate });
        }
      
        if (filters.endDate) {
          query.andWhere('event.endDate <= :endDate', { endDate: filters.endDate });
        }
      
        if (filters.isFeatured !== undefined) {
          query.andWhere('event.isFeatured = :isFeatured', { isFeatured: filters.isFeatured });
        }
      
        if (filters.isTrending !== undefined) {
          query.andWhere('event.isTrending = :isTrending', { isTrending: filters.isTrending });
        }
      
        if (filters.minViews !== undefined) {
          query.andWhere('event.viewCount >= :minViews', { minViews: filters.minViews });
        }
      
        if (filters.maxViews !== undefined) {
          query.andWhere('event.viewCount <= :maxViews', { maxViews: filters.maxViews });
        }
      
        // Pagination
        const page = Number(filters.page) || 1;
        const limit = Number(filters.limit) || 10;
        const offset = (page - 1) * limit;
      
        const [data, totalRecords] = await query
          .skip(offset)
          .take(limit)
          .getManyAndCount();
      
        const totalPages = Math.ceil(totalRecords / limit);
        const nextPage = page < totalPages ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null;
      
        return {
          statusCode: 200,
          message: 'Events retrieved successfully',
          data,
          metadata: {
            totalRecords,
            itemsPerPage: limit,
            currentPage: page,
            nextPage,
            prevPage,
            totalPages,
          },
        };
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

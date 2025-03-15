import { Coupon } from 'src/coupon/entities/coupon.entity';
import { Store } from 'src/store/entities/store.entity';
import { Repository } from 'typeorm';
import { EventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
export declare class EventService {
    private readonly eventRepository;
    private readonly storeRepository;
    private readonly couponRepository;
    constructor(eventRepository: Repository<Event>, storeRepository: Repository<Store>, couponRepository: Repository<Coupon>);
    create(createEventDto: EventDto): Promise<Event>;
    findAll(): Promise<Event[]>;
    findOne(id: string): Promise<Event>;
    update(id: string, updateEventDto: UpdateEventDto): Promise<Event>;
    remove(id: string): Promise<void>;
}

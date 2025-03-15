import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
export declare class StoreService {
    private storeRepository;
    constructor(storeRepository: Repository<Store>);
    create(createStoreDto: CreateStoreDto, userId: string): Promise<Store>;
    findAll(): Promise<Store[]>;
    findAllByUser(userId: string): Promise<Store[]>;
    findOne(id: string): Promise<Store>;
    update(id: string, updateStoreDto: UpdateStoreDto, userId: string, userRole: string): Promise<Store>;
    remove(id: string, userId: string, userRole: string): Promise<void>;
    getStoreCount(): Promise<{
        count: number;
    }>;
    getStoreWithCouponsAndProducts(storeId: string): Promise<{
        store: Store;
    }>;
}

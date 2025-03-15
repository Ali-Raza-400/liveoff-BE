import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';
export declare class StoreController {
    private readonly storeService;
    constructor(storeService: StoreService);
    create(createStoreDto: CreateStoreDto, req: any): Promise<Store>;
    findAll(): Promise<Store[]>;
    findMyStores(req: any): Promise<Store[]>;
    findOne(id: string, req: any): Promise<Store>;
    update(id: string, updateStoreDto: UpdateStoreDto, req: any): Promise<Store>;
    remove(id: string, req: any): Promise<void>;
    getStoreCount(): Promise<{
        count: number;
    }>;
    getStoreWithCouponsAndProducts(storeId: string): Promise<{
        store: Store;
    }>;
}

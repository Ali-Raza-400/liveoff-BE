import { Store } from '../../store/entities/store.entity';
export declare class NetworkResponseDto {
    id: string;
    name: string;
    status: 'active' | 'inactive';
    stores: Store[];
    createdAt: Date;
    updatedAt: Date;
}

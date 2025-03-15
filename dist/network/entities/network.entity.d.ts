import { Store } from '../../store/entities/store.entity';
import { Category } from 'src/category/entities/category.entity';
export declare class Network {
    id: string;
    name: string;
    status: 'active' | 'inactive';
    stores: Store[];
    createdAt: Date;
    updatedAt: Date;
    category: Category;
    categoryId: string;
}

import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { StoreService } from '../store/store.service';
export declare class ProductService {
    private productRepository;
    private storeService;
    constructor(productRepository: Repository<Product>, storeService: StoreService);
    create(createProductDto: CreateProductDto, userId: string): Promise<Product>;
    findAll(): Promise<Product[]>;
    findAllByStore(storeId: string): Promise<Product[]>;
    findAllByUser(userId: string): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    update(id: string, updateProductDto: UpdateProductDto, userId: string, userRole: string): Promise<Product>;
    remove(id: string, userId: string, userRole: string): Promise<void>;
    findFeaturedProducts(): Promise<Product[]>;
    findProductsByCategory(category: string): Promise<Product[]>;
    getProductCount(): Promise<{
        count: number;
    }>;
}

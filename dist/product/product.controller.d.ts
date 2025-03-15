import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto, req: any): Promise<Product>;
    findAll(): Promise<Product[]>;
    findMyProducts(req: any): Promise<Product[]>;
    findByStore(storeId: string): Promise<Product[]>;
    findFeatured(): Promise<Product[]>;
    findByCategory(category: string): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    update(id: string, updateProductDto: UpdateProductDto, req: any): Promise<Product>;
    remove(id: string, req: any): Promise<void>;
    getProductCount(): Promise<{
        count: number;
    }>;
}

import { CreateProductDto } from './create-product.dto';
declare const UpdateProductDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateProductDto>>;
export declare class UpdateProductDto extends UpdateProductDto_base {
    storeId?: string;
    name?: string;
    heading?: string;
    oldPrice?: number;
    currentPrice?: number;
    detail?: string;
    imageUrl?: string;
    htmlUrl?: string;
    category?: string;
    sku?: string;
    size?: string;
    color?: string;
    material?: string;
    isFeatured?: boolean;
    isActive?: boolean;
}
export {};

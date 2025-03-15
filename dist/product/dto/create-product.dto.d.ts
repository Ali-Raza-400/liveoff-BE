export declare class CreateProductDto {
    storeId: string;
    name: string;
    heading: string;
    oldPrice?: number;
    currentPrice: number;
    detail: string;
    imageUrl?: string;
    htmlUrl?: string;
    category: string;
    sku: string;
    size?: string;
    color?: string;
    material?: string;
    isFeatured?: boolean;
    isActive?: boolean;
}

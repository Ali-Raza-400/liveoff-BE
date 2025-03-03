import { IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean, IsUUID, Min, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProductDto {
    @ApiProperty({
        description: 'The store this product belongs to',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsNotEmpty()
    @IsUUID()
    storeId: string;

    @ApiProperty({
        description: 'The name of the product',
        example: 'LP electric guitar'
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Product heading or title',
        example: 'Donner DLP-124S LP Electric Guitar Kit'
    })
    @IsNotEmpty()
    @IsString()
    heading: string;

    @ApiPropertyOptional({
        description: 'Old price of the product',
        example: 149.99
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    oldPrice?: number;

    @ApiProperty({
        description: 'Current price of the product',
        example: 129.99
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    currentPrice: number;

    @ApiProperty({
        description: 'Detailed description of the product',
        example: 'This DLP-124S LP electric guitar kit features a sunburst yellow body with bag, strap, cable, and more accessories.'
    })
    @IsNotEmpty()
    @IsString()
    detail: string;

    @ApiPropertyOptional({
        description: 'URL to the product image',
        example: 'https://example.com/product-image.jpg'
    })
    @IsOptional()
    @IsUrl()
    imageUrl?: string;

    @ApiPropertyOptional({
        description: 'HTML URL for the product',
        example: 'https://to.tradetracker.net/?c=24226&m=12&a=374223&r=&u='
    })
    @IsOptional()
    @IsUrl()
    htmlUrl?: string;

    @ApiProperty({
        description: 'Category of the product',
        example: 'Electronics'
    })
    @IsNotEmpty()
    @IsString()
    category: string;

    @ApiProperty({
        description: 'Stock Keeping Unit (SKU) of the product',
        example: 'EC1276'
    })
    @IsNotEmpty()
    @IsString()
    sku: string;

    @ApiPropertyOptional({
        description: 'Size of the product',
        example: '39 inch'
    })
    @IsOptional()
    @IsString()
    size?: string;

    @ApiPropertyOptional({
        description: 'Color of the product',
        example: 'Sunburst Yellow'
    })
    @IsOptional()
    @IsString()
    color?: string;

    @ApiPropertyOptional({
        description: 'Material of the product',
        example: 'AAA Solid Poplar'
    })
    @IsOptional()
    @IsString()
    material?: string;

    @ApiPropertyOptional({
        description: 'Flag indicating if this is a featured product',
        example: true,
        default: false
    })
    @IsOptional()
    @IsBoolean()
    isFeatured?: boolean;

    @ApiPropertyOptional({
        description: 'Flag indicating if the product is active',
        example: true,
        default: true
    })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
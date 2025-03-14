import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber, IsArray, IsDateString, IsUUID } from 'class-validator';

export class CreateCouponDto {
    @ApiProperty({
        description: 'The name of the coupon',
        example: '€350 De Reduction Promo'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Detailed description of the coupon',
        example: 'Christmas Sale! Get up to €350 off on your purchase when you shop through this landing page.'
    })
    @IsString()
    @IsNotEmpty()
    detail: string;

    @ApiProperty({
        description: 'The coupon code',
        example: 'SAVE350',
        required: false
    })
    @IsString()
    @IsOptional()
    code?: string;

    @ApiProperty({
        description: 'HTML code URL for the coupon',
        example: 'https://clk.tradedoubler.com/click?p=311962&a=3237124&url=https%3A%2F%2Fr.donner-music.com',
        required: false
    })
    @IsString()
    @IsOptional()
    htmlCodeUrl?: string;

    @ApiProperty({
        description: 'Start date of the coupon validity',
        example: '2023-12-01T00:00:00Z'
    })
    @IsDateString()
    @IsNotEmpty()
    startDate: string;

    @ApiProperty({
        description: 'End date of the coupon validity',
        example: '2023-12-31T23:59:59Z'
    })
    @IsDateString()
    @IsNotEmpty()
    endDate: string;

    @ApiProperty({
        description: 'Category of the coupon',
        example: 'Electronics'
    })
    @IsString()
    @IsNotEmpty()
    category: string;

    @ApiProperty({
        description: 'Rank of the coupon for sorting',
        example: 2,
        required: false,
        default: 0
    })
    @IsNumber()
    @IsOptional()
    rank?: number;

    @ApiProperty({
        description: 'Flag indicating if this is a free shipping coupon',
        example: false,
        required: false,
        default: false
    })
    @IsBoolean()
    @IsOptional()
    isFreeShipping?: boolean;

    @ApiProperty({
        description: 'Flag indicating if this coupon is exclusive',
        example: false,
        required: false,
        default: false
    })
    @IsBoolean()
    @IsOptional()
    isExclusive?: boolean;

    @ApiProperty({
        description: 'Flag indicating if this coupon is verified',
        example: true,
        required: false,
        default: false
    })
    @IsBoolean()
    @IsOptional()
    isVerified?: boolean;

    @ApiProperty({
        description: 'Flag indicating if this coupon should be shown on the home page',
        example: false,
        required: false,
        default: false
    })
    @IsBoolean()
    @IsOptional()
    showOnHomePage?: boolean;

    @ApiProperty({
        description: 'Flag indicating if this coupon is a top category coupon',
        example: false,
        required: false,
        default: false
    })
    @IsBoolean()
    @IsOptional()
    isTopCategory?: boolean;

    @ApiProperty({
        description: 'Main image for the coupon',
        example: '€350',
        required: false
    })
    @IsString()
    @IsOptional()
    mainImage?: string;

    @ApiProperty({
        description: 'Secondary image for the coupon',
        example: 'De Reduction',
        required: false
    })
    @IsString()
    @IsOptional()
    secondaryImage?: string;

    @ApiProperty({
        description: 'Code image for the coupon',
        example: 'Code',
        required: false
    })
    @IsString()
    @IsOptional()
    codeImage?: string;

    @ApiProperty({
        description: 'Flag indicating if the coupon is active',
        example: true,
        required: false,
        default: true
    })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @ApiProperty({
        description: 'ID of the store this coupon belongs to',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsUUID()
    @IsNotEmpty()
    storeId: string;

    @ApiProperty({
        description: 'Array of product IDs this coupon applies to',
        example: ['123e4567-e89b-12d3-a456-426614174000', '223e4567-e89b-12d3-a456-426614174001'],
        required: false,
        type: [String]
    })
    @IsArray()
    @IsUUID('4', { each: true })
    @IsOptional()
    productIds?: string[];

    
    @ApiProperty({ description: 'List of associated event IDs', isArray: true })
    @IsUUID(undefined, { each: true })
    @IsOptional()
    eventIds?: string[];
}
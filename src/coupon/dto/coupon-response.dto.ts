import { ApiProperty } from '@nestjs/swagger';
import { Coupon } from '../entities/coupon.entity';

export class CouponResponseDto {
    @ApiProperty({
        description: 'Unique identifier for the coupon',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    id: string;

    @ApiProperty({
        description: 'The name of the coupon',
        example: '€350 De Reduction Promo'
    })
    name: string;

    @ApiProperty({
        description: 'Detailed description of the coupon',
        example: 'Christmas Sale! Get up to €350 off on your purchase when you shop through this landing page.'
    })
    detail: string;

    @ApiProperty({
        description: 'The coupon code',
        example: 'SAVE350',
        nullable: true
    })
    code: string | null;

    @ApiProperty({
        description: 'HTML code URL for the coupon',
        example: 'https://clk.tradedoubler.com/click?p=311962&a=3237124&url=https%3A%2F%2Fr.donner-music.com',
        nullable: true
    })
    htmlCodeUrl: string | null;

    @ApiProperty({
        description: 'Start date of the coupon validity',
        example: '2023-12-01T00:00:00Z'
    })
    startDate: Date;

    @ApiProperty({
        description: 'End date of the coupon validity',
        example: '2023-12-31T23:59:59Z'
    })
    endDate: Date;

    @ApiProperty({
        description: 'Category of the coupon',
        example: 'Electronics'
    })
    category: string;

    @ApiProperty({
        description: 'Rank of the coupon for sorting',
        example: 2
    })
    rank: number;

    @ApiProperty({
        description: 'Flag indicating if this is a free shipping coupon',
        example: false
    })
    isFreeShipping: boolean;

    @ApiProperty({
        description: 'Flag indicating if this coupon is exclusive',
        example: false
    })
    isExclusive: boolean;

    @ApiProperty({
        description: 'Flag indicating if this coupon is verified',
        example: true
    })
    isVerified: boolean;

    @ApiProperty({
        description: 'Flag indicating if this coupon should be shown on the home page',
        example: false
    })
    showOnHomePage: boolean;

    @ApiProperty({
        description: 'Flag indicating if this coupon is a top category coupon',
        example: false
    })
    isTopCategory: boolean;

    @ApiProperty({
        description: 'Main image for the coupon',
        example: '€350',
        nullable: true
    })
    mainImage: string | null;

    @ApiProperty({
        description: 'Secondary image for the coupon',
        example: 'De Reduction',
        nullable: true
    })
    secondaryImage: string | null;

    @ApiProperty({
        description: 'Code image for the coupon',
        example: 'Code',
        nullable: true
    })
    codeImage: string | null;

    @ApiProperty({
        description: 'Flag indicating if the coupon is active',
        example: true
    })
    isActive: boolean;

    @ApiProperty({
        description: 'Date when the coupon was created',
        example: '2023-01-01T00:00:00Z'
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Date when the coupon was last updated',
        example: '2023-01-02T00:00:00Z'
    })
    updatedAt: Date;

    @ApiProperty({
        description: 'ID of the store this coupon belongs to',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    storeId: string;

    @ApiProperty({
        description: 'Store information',
        nullable: true
    })
    store?: {
        id: string;
        name: string;
        logoUrl?: string;
    };

    @ApiProperty({
        description: 'Products associated with this coupon',
        type: Array,
        nullable: true
    })
    products?: Array<{
        id: string;
        name: string;
        currentPrice: number;
        imageUrl?: string;
    }>;

    static fromEntity(coupon: Coupon): CouponResponseDto {
        const dto = new CouponResponseDto();
        dto.id = coupon.id;
        dto.name = coupon.name;
        dto.detail = coupon.detail;
        dto.code = coupon.code;
        dto.htmlCodeUrl = coupon.htmlCodeUrl;
        dto.startDate = coupon.startDate;
        dto.endDate = coupon.endDate;
        dto.category = coupon.category;
        dto.rank = coupon.rank;
        dto.isFreeShipping = coupon.isFreeShipping;
        dto.isExclusive = coupon.isExclusive;
        dto.isVerified = coupon.isVerified;
        dto.showOnHomePage = coupon.showOnHomePage;
        dto.isTopCategory = coupon.isTopCategory;
        dto.mainImage = coupon.mainImage;
        dto.secondaryImage = coupon.secondaryImage;
        dto.codeImage = coupon.codeImage;
        dto.isActive = coupon.isActive;
        dto.createdAt = coupon.createdAt;
        dto.updatedAt = coupon.updatedAt;
        dto.storeId = coupon.storeId;

        // Include store information if available
        if (coupon.store) {
            dto.store = {
                id: coupon.store.id,
                name: coupon.store.name,
                logoUrl: coupon.store.logoUrl
            };
        }

        // Include products information if available
        if (coupon.products && coupon.products.length > 0) {
            dto.products = coupon.products.map(product => ({
                id: product.id,
                name: product.name,
                currentPrice: Number(product.currentPrice),
                imageUrl: product.imageUrl
            }));
        }

        return dto;
    }
}
import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateStoreDto } from './create-store.dto';
import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsArray, IsUUID } from 'class-validator';

export class UpdateStoreDto extends PartialType(CreateStoreDto) {
    @ApiPropertyOptional({
        description: 'The name of the store',
        example: 'My Awesome Store'
    })
    name?: string;

    @ApiPropertyOptional({
        description: 'Secondary name or tagline for the store',
        example: 'Best Deals Online'
    })
    secondaryName?: string;

    @ApiPropertyOptional({
        description: 'Primary heading for the store page',
        example: 'Welcome to Our Store'
    })
    headingH1?: string;

    @ApiPropertyOptional({
        description: 'Secondary heading for the store page',
        example: 'Find the Best Deals'
    })
    headingH2?: string;

    @ApiPropertyOptional({
        description: 'Unique identifier for the store in the system',
        example: 'store-123'
    })
    storeId?: string;

    @ApiPropertyOptional({
        description: 'URL of the store website',
        example: 'https://www.mystore.com'
    })
    storeUrl?: string;

    @ApiPropertyOptional({
        description: 'Network the store belongs to',
        example: 'Retail Network'
    })
    network?: string;

    @ApiPropertyOptional({
        description: 'HTML code for embedding store content',
        example: '<div class="store-embed">Store content</div>'
    })
    htmlCode?: string;

    @ApiPropertyOptional({
        description: 'Code for tracking impressions',
        example: '<script>trackImpression("store-123")</script>'
    })
    impressionCode?: string;

    @ApiPropertyOptional({
        description: 'Title for the store page',
        example: 'My Store - Best Deals Online'
    })
    storeTitle?: string;

    @ApiPropertyOptional({
        description: 'Categories the store belongs to',
        example: ['Electronics', 'Home Appliances', 'Gadgets'],
        type: [String]
    })
    categories?: string[];

    @ApiPropertyOptional({
        description: 'Flag indicating if this is a popular store',
        example: true
    })
    isPopularStore?: boolean;

    @ApiPropertyOptional({
        description: 'Flag indicating if this is a featured store',
        example: false
    })
    isFeatureStore?: boolean;

    @ApiPropertyOptional({
        description: 'Flag indicating if this is a category featured store',
        example: true
    })
    isCategoryFeatureStore?: boolean;

    @ApiPropertyOptional({
        description: 'URL to the store logo image',
        example: 'https://example.com/store-logo.png'
    })
    logoUrl?: string;

    @ApiPropertyOptional({
        description: 'URL to the store thumbnail image',
        example: 'https://example.com/store-thumbnail.png'
    })
    thumbnailUrl?: string;

    @ApiPropertyOptional({
        description: 'Flag indicating if the store is active',
        example: true,
        default: true
    })
    isActive?: boolean;
}
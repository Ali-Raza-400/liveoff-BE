import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsArray, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStoreDto {
    @ApiProperty({
        description: 'The name of the store',
        example: 'My Awesome Store'
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiPropertyOptional({
        description: 'Secondary name or tagline for the store',
        example: 'Best Deals Online'
    })
    @IsOptional()
    @IsString()
    secondaryName?: string;

    @ApiPropertyOptional({
        description: 'Primary heading for the store page',
        example: 'Welcome to Our Store'
    })
    @IsOptional()
    @IsString()
    headingH1?: string;

    @ApiPropertyOptional({
        description: 'Secondary heading for the store page',
        example: 'Find the Best Deals'
    })
    @IsOptional()
    @IsString()
    headingH2?: string;

    @ApiPropertyOptional({
        description: 'Unique identifier for the store in the system',
        example: 'store-123'
    })
    @IsOptional()
    @IsString()
    storeId?: string;

    @ApiPropertyOptional({
        description: 'URL of the store website',
        example: 'https://www.mystore.com'
    })
    @IsOptional()
    @IsString()
    storeUrl?: string;

    @ApiPropertyOptional({
        description: 'Network the store belongs to',
        example: 'Retail Network'
    })
    @IsOptional()
    @IsString()
    network?: string;

    @ApiPropertyOptional({
        description: 'HTML code for embedding store content',
        example: '<div class="store-embed">Store content</div>'
    })
    @IsOptional()
    @IsString()
    htmlCode?: string;

    @ApiPropertyOptional({
        description: 'Code for tracking impressions',
        example: '<script>trackImpression("store-123")</script>'
    })
    @IsOptional()
    @IsString()
    impressionCode?: string;

    @ApiPropertyOptional({
        description: 'Title for the store page',
        example: 'My Store - Best Deals Online'
    })
    @IsOptional()
    @IsString()
    storeTitle?: string;

    @ApiPropertyOptional({
        description: 'Categories the store belongs to',
        example: ['Electronics', 'Home Appliances', 'Gadgets'],
        type: [String]
    })
    @IsOptional()
    @IsArray()
    categories?: string[];

    @ApiPropertyOptional({
        description: 'Flag indicating if this is a popular store',
        example: true
    })
    @IsOptional()
    @IsBoolean()
    isPopularStore?: boolean;

    @ApiPropertyOptional({
        description: 'Flag indicating if this is a featured store',
        example: false
    })
    @IsOptional()
    @IsBoolean()
    isFeatureStore?: boolean;

    @ApiPropertyOptional({
        description: 'Flag indicating if this is a category featured store',
        example: true
    })
    @IsOptional()
    @IsBoolean()
    isCategoryFeatureStore?: boolean;

    @ApiPropertyOptional({
        description: 'URL to the store logo image',
        example: 'https://example.com/store-logo.png'
    })
    @IsOptional()
    @IsString()
    logoUrl?: string;

    @ApiPropertyOptional({
        description: 'URL to the store thumbnail image',
        example: 'https://example.com/store-thumbnail.png'
    })
    @IsOptional()
    @IsString()
    thumbnailUrl?: string;

    @ApiPropertyOptional({
        description: 'Flag indicating if the store is active',
        example: true,
        default: true
    })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
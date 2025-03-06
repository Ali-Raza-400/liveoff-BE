import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsArray, IsUrl } from 'class-validator';

export class CreateStoreDto {
  @ApiProperty({
    description: 'The name of the store',
    example: 'My Awesome Store'
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Secondary name or tagline for the store',
    example: 'Best Deals Online',
    required: false
  })
  @IsOptional()
  @IsString()
  secondaryName?: string;

  @ApiProperty({
    description: 'Primary heading for the store page',
    example: 'Welcome to Our Store',
    required: false
  })
  @IsOptional()
  @IsString()
  headingH1?: string;

  @ApiProperty({
    description: 'Secondary heading for the store page',
    example: 'Find the Best Deals',
    required: false
  })
  @IsOptional()
  @IsString()
  headingH2?: string;

  @ApiProperty({
    description: 'Unique identifier for the store in the system',
    example: 'store-123',
    required: false
  })
  @IsOptional()
  @IsString()
  storeId?: string;

  @ApiProperty({
    description: 'URL of the store website',
    example: 'https://www.mystore.com',
    required: false
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  storeUrl?: string;

  @ApiProperty({
    description: 'Network the store belongs to',
    example: 'Retail Network',
    required: false
  })
  @IsOptional()
  @IsString()
  network?: string;

  @ApiProperty({
    description: 'HTML code for embedding store content',
    example: '<div class="store-embed">Store content</div>',
    required: false
  })
  @IsOptional()
  @IsString()
  htmlCode?: string;

  @ApiProperty({
    description: 'Code for tracking impressions',
    example: '<script>trackImpression("store-123")</script>',
    required: false
  })
  @IsOptional()
  @IsString()
  impressionCode?: string;

  @ApiProperty({
    description: 'Title for the store page',
    example: 'My Store - Best Deals Online',
    required: false
  })
  @IsOptional()
  @IsString()
  storeTitle?: string;

  @ApiProperty({
    description: 'Categories the store belongs to',
    example: ['Electronics', 'Home Appliances', 'Gadgets'],
    required: false,
    type: [String]
  })
  @IsOptional()
  @IsArray()
  categories?: string[];

  @ApiProperty({
    description: 'Flag indicating if this is a popular store',
    example: true,
    required: false,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  isPopularStore?: boolean;

  @ApiProperty({
    description: 'Flag indicating if this is a featured store',
    example: false,
    required: false,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  isFeatureStore?: boolean;

  @ApiProperty({
    description: 'Flag indicating if this is a category featured store',
    example: true,
    required: false,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  isCategoryFeatureStore?: boolean;

  @ApiProperty({
    description: 'URL to the store logo image',
    example: 'https://example.com/store-logo.png',
    required: false
  })
  @IsOptional()
  @IsString()
  logoUrl?: string;

  @ApiProperty({
    description: 'URL to the store thumbnail image',
    example: 'https://example.com/store-thumbnail.png',
    required: false
  })
  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @ApiProperty({
    description: 'Flag indicating if the store is active',
    example: true,
    required: false,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  // New SEO Fields
  @ApiProperty({
    description: 'Meta description for SEO',
    example: 'Find the best deals at My Awesome Store. Shop now for exclusive offers.',
    required: false
  })
  @IsOptional()
  @IsString()
  metaDescription?: string;

  @ApiProperty({
    description: 'Store description for SEO',
    example: 'My Awesome Store offers a wide range of products at competitive prices.',
    required: false
  })
  @IsOptional()
  @IsString()
  storeDescription?: string;

  @ApiProperty({
    description: 'HTML content for the store article/description',
    example: '<p>Welcome to our store. We offer the best products...</p>',
    required: false
  })
  @IsOptional()
  @IsString()
  storeArticle?: string;
}
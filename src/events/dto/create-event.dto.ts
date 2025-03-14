import { ApiProperty } from '@nestjs/swagger';
import { 
    IsArray, 
    IsDateString, 
    IsOptional, 
    IsString, 
    IsUUID, 
    IsBoolean, 
    IsNumber 
} from 'class-validator';

export class EventDto {
    @ApiProperty({ description: 'Title of the event', example: 'Christmas Deals 2025' })
    @IsString()
    title: string;

    @ApiProperty({ description: 'Event heading for the first description section', example: 'Christmas Deals 2025' })
    @IsOptional()
    @IsString()
    descriptionHeading?: string;

    @ApiProperty({ description: 'Main event description', example: 'Undoubtedly the biggest shopping holiday...' })
    @IsString()
    description: string;

    @ApiProperty({ description: 'Additional heading for extended event details', example: 'What Does Size-Inclusive Mean?' })
    @IsOptional()
    @IsString()
    extraDescriptionHeading?: string;

    @ApiProperty({ description: 'Extra content section for the event', example: 'If savings are in, we predict that you will succeed...' })
    @IsOptional()
    @IsString()
    extraDescriptionContent?: string;

    @ApiProperty({ description: 'Event start date', example: '2025-12-01T00:00:00Z' })
    @IsDateString()
    startDate: Date;

    @ApiProperty({ description: 'Event end date', example: '2025-12-31T23:59:59Z' })
    @IsDateString()
    endDate: Date;

    @ApiProperty({ description: 'Event banner image URL', required: false, example: 'https://example.com/banner.jpg' })
    @IsOptional()
    @IsString()
    bannerImage?: string;

    @ApiProperty({ description: 'SEO meta description', required: false, example: 'Get the best Christmas deals of 2025' })
    @IsOptional()
    @IsString()
    metaDescription?: string;

    @ApiProperty({ description: 'SEO keywords', required: false, example: ['Christmas Deals', 'Best Offers', 'Holiday Discounts'] })
    @IsOptional()
    @IsArray()
    seoKeywords?: string[];

    @ApiProperty({ description: 'Indicates whether the event is featured on the homepage', required: false, example: true })
    @IsOptional()
    @IsBoolean()
    isFeatured?: boolean;

    @ApiProperty({ description: 'Indicates whether the event is trending based on popularity', required: false, example: true })
    @IsOptional()
    @IsBoolean()
    isTrending?: boolean;

    @ApiProperty({ description: 'Total number of views for the event', required: false, example: 5000 })
    @IsOptional()
    @IsNumber()
    viewCount?: number;

    @ApiProperty({ description: 'Terms and conditions related to the event', required: false, example: 'Limited to the first 500 customers' })
    @IsOptional()
    @IsString()
    termsAndConditions?: string;

    @ApiProperty({ description: 'List of associated store IDs', type: [String], required: false })
    @IsOptional()
    @IsArray()
    @IsUUID('4', { each: true })
    storeIds?: string[];

    @ApiProperty({ description: 'List of associated coupon IDs', type: [String], required: false })
    @IsOptional()
    @IsArray()
    @IsUUID('4', { each: true })
    couponIds?: string[];
}

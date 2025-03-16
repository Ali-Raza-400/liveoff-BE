import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsUrl, IsUUID } from 'class-validator';

export class CreateBlogDto {
    @ApiProperty({ description: 'Title of the blog post' })
    @IsString()
    title: string;

    @ApiProperty({ description: 'Content of the blog post' })
    @IsString()
    content: string;

    @ApiProperty({ description: 'Featured image URL', required: false })
    @IsOptional()
    @IsUrl()
    featuredImage?: string;

    @ApiProperty({ description: 'Meta description for SEO', required: false })
    @IsOptional()
    @IsString()
    metaDescription?: string;

    @ApiProperty({ description: 'Whether the blog post is featured', default: false })
    @IsOptional()
    @IsBoolean()
    isFeatured?: boolean;

    @ApiProperty({ description: 'Whether the blog post is trending', default: false })
    @IsOptional()
    @IsBoolean()
    isTrending?: boolean;

    @ApiProperty({ description: 'Category ID of the blog post' })
    @IsUUID()
    categoryId: string;

    @ApiProperty({ description: 'Author ID of the blog post', required: false })
    @IsOptional() // ✅ Correct annotation
    @IsUUID()
    author?: string;
}

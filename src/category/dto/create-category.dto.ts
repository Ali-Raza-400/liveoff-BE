import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty()
    @IsString()
    categoryName: string;

    @ApiProperty()
    @IsString()
    categoryTitle: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    categoryDescription?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsUrl()
    image?: string;
}

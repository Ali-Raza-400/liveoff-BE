import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

class SectionDto {
  @ApiProperty({ description: 'Section title' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Section description (supports rich text)' })
  @IsString()
  description: string;
}

export class CreateTermsConditionDto {
  @ApiProperty({
    description: 'Array of terms and conditions sections',
    type: [SectionDto]
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => SectionDto)
  sections: SectionDto[];
}
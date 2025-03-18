import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePrivacyPolicyDto, PrivacyPolicyQuestionDto } from './create-privacy-policy.dto';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePrivacyPolicyDto {
    @ApiProperty({
      description: 'Array of questions and answers related to the privacy policy',
      type: [PrivacyPolicyQuestionDto],
      required: false
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PrivacyPolicyQuestionDto)
    questions?: PrivacyPolicyQuestionDto[];
  
    @ApiProperty({
      description: 'The timestamp when the privacy policy was created',
      example: '2024-02-29T12:00:00Z',
      required: false
    })
    @IsString()
    dateOfCreation?: string; // ✅ Optional for update
  }
  
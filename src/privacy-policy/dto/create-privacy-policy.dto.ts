import { IsString, IsArray, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PrivacyPolicyQuestionDto {
  @ApiProperty({
    description: 'The question related to the privacy policy',
    example: 'What information do we collect?'
  })
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty({
    description: 'The detailed answer to the privacy policy question',
    example: 'We collect personal information such as your name, email address, and usage data.'
  })
  @IsString()
  @IsNotEmpty()
  answer: string;
}

export class CreatePrivacyPolicyDto {
  @ApiProperty({
    description: 'Array of questions and answers related to the privacy policy',
    type: [PrivacyPolicyQuestionDto]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PrivacyPolicyQuestionDto)
  questions: PrivacyPolicyQuestionDto[];

  @ApiProperty({
    description: 'The timestamp when the privacy policy was created',
    example: '2024-02-29T12:00:00Z'
  })
  @IsString()
  @IsNotEmpty()
  dateOfCreation: string; // ✅ Accepting user input for created date
}

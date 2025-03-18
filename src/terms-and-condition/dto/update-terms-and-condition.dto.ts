import { PartialType } from '@nestjs/swagger';
import { CreateTermsConditionDto } from './create-terms-and-condition.dto';

export class UpdateTermsConditionDto extends PartialType(CreateTermsConditionDto) {}
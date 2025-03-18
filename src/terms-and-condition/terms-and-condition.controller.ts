import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TermsConditionService } from './terms-and-condition.service';
import { CreateTermsConditionDto } from './dto/create-terms-and-condition.dto';
import { TermsCondition } from './entities/terms-and-condition.entity';
import { UpdateTermsConditionDto } from './dto/update-terms-and-condition.dto';

@ApiTags('terms-conditions')
@Controller('terms-conditions')
export class TermsConditionController {
  constructor(private readonly termsConditionService: TermsConditionService) {}

  @Post()
  @ApiOperation({ summary: 'Create new terms and conditions' })
  @ApiResponse({
    status: 201,
    description: 'The terms and conditions have been successfully created.',
    type: TermsCondition,
  })
  create(@Body() createTermsConditionDto: CreateTermsConditionDto) {
    return this.termsConditionService.create(createTermsConditionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all terms and conditions' })
  @ApiResponse({
    status: 200,
    description: 'List of all terms and conditions',
    type: [TermsCondition],
  })
  findAll() {
    return this.termsConditionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get terms and conditions by id' })
  @ApiResponse({
    status: 200,
    description: 'The found terms and conditions',
    type: TermsCondition,
  })
  findOne(@Param('id') id: string) {
    return this.termsConditionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update terms and conditions' })
  @ApiResponse({
    status: 200,
    description: 'The terms and conditions have been successfully updated.',
    type: TermsCondition,
  })
  update(
    @Param('id') id: string,
    @Body() updateTermsConditionDto: UpdateTermsConditionDto,
  ) {
    return this.termsConditionService.update(id, updateTermsConditionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete terms and conditions' })
  @ApiResponse({
    status: 200,
    description: 'The terms and conditions have been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.termsConditionService.remove(id);
  }
}
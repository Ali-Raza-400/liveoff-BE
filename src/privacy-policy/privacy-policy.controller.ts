import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PrivacyPolicyService } from './privacy-policy.service';
import { CreatePrivacyPolicyDto } from './dto/create-privacy-policy.dto';
import { UpdatePrivacyPolicyDto } from './dto/update-privacy-policy.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PrivacyPolicy } from './entities/privacy-policy.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags('Privacy Policy')
@ApiBearerAuth()
@Controller('privacy-policy')
@UseGuards(JwtAuthGuard)
export class PrivacyPolicyController {
  constructor(private readonly privacyPolicyService: PrivacyPolicyService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new privacy policy' })
  @ApiResponse({
    status: 201,
    description: 'The privacy policy has been successfully created.',
    type: PrivacyPolicy,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  create(@Body() createPrivacyPolicyDto: CreatePrivacyPolicyDto) {
    return this.privacyPolicyService.create(createPrivacyPolicyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all privacy policies' })
  @ApiResponse({
    status: 200,
    description: 'List of all privacy policies.',
    type: [PrivacyPolicy],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAll() {
    return this.privacyPolicyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific privacy policy by ID' })
  @ApiResponse({
    status: 200,
    description: 'The privacy policy has been found.',
    type: PrivacyPolicy,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Privacy policy not found.' })
  findOne(@Param('id') id: string) {
    return this.privacyPolicyService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a privacy policy' })
  @ApiResponse({
    status: 200,
    description: 'The privacy policy has been successfully updated.',
    type: PrivacyPolicy,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Privacy policy not found.' })
  update(
    @Param('id') id: string,
    @Body() updatePrivacyPolicyDto: UpdatePrivacyPolicyDto,
  ) {
    return this.privacyPolicyService.update(id, updatePrivacyPolicyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a privacy policy' })
  @ApiResponse({
    status: 200,
    description: 'The privacy policy has been successfully deleted.',
    type: PrivacyPolicy,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Privacy policy not found.' })
  remove(@Param('id') id: string) {
    return this.privacyPolicyService.remove(id);
  }
}
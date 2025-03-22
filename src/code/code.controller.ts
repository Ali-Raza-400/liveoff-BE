import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CodeService } from './code.service';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import { Code } from './entities/code.entity';

@ApiTags('Codes')
@Controller('codes')
export class CodeController {
    constructor(private readonly codeService: CodeService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new code' })
    @ApiResponse({ status: 201, description: 'Code created successfully', type: Code })
    async create(@Body() createCodeDto: CreateCodeDto): Promise<Code> {
        return this.codeService.create(createCodeDto);
    }

    @Get('by-type')
    @ApiOperation({ summary: 'Fetch codes based on type' })
    @ApiQuery({ name: 'type', required: true, description: 'Type of the code (e.g., shipping, discount, promo)' })
    @ApiResponse({ status: 200, description: 'List of codes matching the type', type: [Code] })
    async findByType(@Query('type') type: string): Promise<Code[]> {
        return this.codeService.findByType(type);
    }

    @Get()
    @ApiOperation({ summary: 'Get all codes' })
    @ApiResponse({ status: 200, description: 'List of all codes', type: [Code] })
    async findAll(): Promise<Code[]> {
        return this.codeService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a code by ID' })
    @ApiResponse({ status: 200, description: 'Code found', type: Code })
    @ApiResponse({ status: 404, description: 'Code not found' })
    async findOne(@Param('id') id: string): Promise<Code> {
        return this.codeService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a code' })
    @ApiResponse({ status: 200, description: 'Code updated successfully', type: Code })
    @ApiResponse({ status: 404, description: 'Code not found' })
    async update(@Param('id') id: string, @Body() updateCodeDto: UpdateCodeDto): Promise<Code> {
        return this.codeService.update(id, updateCodeDto);
    }
    
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a code' })
    @ApiResponse({ status: 200, description: 'Code deleted successfully' })
    @ApiResponse({ status: 404, description: 'Code not found' })
    async remove(@Param('id') id: string): Promise<void> {
        return this.codeService.remove(id);
    }
    
}

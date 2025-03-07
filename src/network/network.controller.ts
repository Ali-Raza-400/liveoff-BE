import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NetworkService } from './network.service';
import { CreateNetworkDto } from './dto/create-network.dto';
import { UpdateNetworkDto } from './dto/update-network.dto';
import { NetworkResponseDto } from './dto/network-response.dto';

@ApiTags('Networks')
@Controller('networks')
export class NetworkController {
    constructor(private readonly networkService: NetworkService) {}

    @Post()
    @ApiOperation({ summary: 'Create new network' })
    @ApiResponse({ type: NetworkResponseDto })
    async create(@Body() dto: CreateNetworkDto): Promise<NetworkResponseDto> {
        return this.networkService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all networks' })
    @ApiResponse({ type: [NetworkResponseDto] })
    async findAll(): Promise<NetworkResponseDto[]> {
        return this.networkService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a single network' })
    @ApiResponse({ type: NetworkResponseDto })
    async findOne(@Param('id') id: string): Promise<NetworkResponseDto> {
        return this.networkService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update network' })
    @ApiResponse({ type: NetworkResponseDto })
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateNetworkDto,
    ): Promise<NetworkResponseDto> {
        return this.networkService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete network' })
    @ApiResponse({ description: 'Network deleted successfully' })
    async remove(@Param('id') id: string): Promise<void> {
        return this.networkService.remove(id);
    }
}

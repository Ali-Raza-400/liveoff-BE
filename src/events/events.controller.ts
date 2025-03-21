import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EventDto } from './dto/create-event.dto';
import { EventService } from './events.service';
import { UpdateEventDto } from './dto/update-event.dto';

@ApiTags('Events')
@Controller('events')
export class EventController {
    constructor(private readonly eventService: EventService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new event' })
    @ApiResponse({ status: 201, description: 'Event created successfully.' })
    async create(@Body() createEventDto: EventDto) {
        return this.eventService.create(createEventDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all events' })
    @ApiResponse({ status: 200, description: 'List of events retrieved successfully.' })
    async findAll() {
        return this.eventService.findAll();
    }

    @Get('/search')
    @ApiOperation({ summary: 'Get all events with optional filters and pagination' })
    @ApiResponse({ status: 200, description: 'List of events retrieved successfully.' })
    async findAllWithFilter(
        @Query('name') name?: string,
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
        @Query('isFeatured') isFeatured?: boolean,
        @Query('isTrending') isTrending?: boolean,
        @Query('minViews') minViews?: number,
        @Query('maxViews') maxViews?: number,
        @Query('page') page = 1,
        @Query('limit') limit = 10
    ) {
        return this.eventService.findAllWithFilter({ name, startDate, endDate, isFeatured, isTrending, minViews, maxViews, page, limit });
    }


    @Get(':id')
    @ApiOperation({ summary: 'Get an event by ID' })
    @ApiResponse({ status: 200, description: 'Event retrieved successfully.' })
    async findOne(@Param('id') id: string) {
        return this.eventService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update an event by ID' })
    @ApiResponse({ status: 200, description: 'Event updated successfully.' })
    async update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
        return this.eventService.update(id, updateEventDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an event by ID' })
    @ApiResponse({ status: 200, description: 'Event deleted successfully.' })
    async remove(@Param('id') id: string) {
        return this.eventService.remove(id);
    }
}

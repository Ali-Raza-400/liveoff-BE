import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/custom-decorators/role_decorator';
import { UserRole } from 'src/user/enums/role.enum';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Store } from './entities/store.entity';

@ApiTags('stores')
@ApiBearerAuth()
@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new store' })
  @ApiResponse({
    status: 201,
    description: 'The store has been successfully created.',
    type: Store
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiBody({ type: CreateStoreDto })
  create(@Body() createStoreDto: CreateStoreDto, @Request() req) {

    return this.storeService.create(createStoreDto, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all stores (admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Return all stores.',
    type: [Store]
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - requires admin role.' })
  findAll() {
    return this.storeService.findAll();
  }

  @Get('my-stores')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all stores owned by the current user' })
  @ApiResponse({
    status: 200,
    description: 'Return all stores owned by the current user.',
    type: [Store]
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findMyStores(@Request() req) {
    return this.storeService.findAllByUser(req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a store by ID' })
  @ApiParam({ name: 'id', description: 'Store ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the store with the specified ID.',
    type: Store
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - user does not have permission to access this store.' })
  @ApiResponse({ status: 404, description: 'Store not found.' })
  async findOne(@Param('id') id: string, @Request() req) {
    const store = await this.storeService.findOne(id);

    // If the user is not an admin and not the owner of the store, throw an exception
    if (req.user.role !== 'admin' && store.userId !== req.user.id) {
      throw new ForbiddenException('You do not have permission to access this store');
    }

    return store;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a store' })
  @ApiParam({ name: 'id', description: 'Store ID' })
  @ApiBody({ type: UpdateStoreDto })
  @ApiResponse({
    status: 200,
    description: 'The store has been successfully updated.',
    type: Store
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - user does not have permission to update this store.' })
  @ApiResponse({ status: 404, description: 'Store not found.' })
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto, @Request() req) {
    return this.storeService.update(id, updateStoreDto, req.user.id, req.user.role);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a store' })
  @ApiParam({ name: 'id', description: 'Store ID' })
  @ApiResponse({ status: 200, description: 'The store has been successfully deleted.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - user does not have permission to delete this store.' })
  @ApiResponse({ status: 404, description: 'Store not found.' })
  remove(@Param('id') id: string, @Request() req) {
    return this.storeService.remove(id, req.user.id, req.user.role);
  }

  @Get('stats/count')
  @ApiOperation({ summary: 'Get store count' })
  @ApiResponse({ status: 200, description: 'Store count fetched successfully' })
  async getStoreCount() {
    return this.storeService.getStoreCount();
  }

}
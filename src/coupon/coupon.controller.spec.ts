import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query, ParseUUIDPipe, ParseBoolPipe } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { CouponResponseDto } from './dto/coupon-response.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/custom-decorators/role_decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { UserRole } from 'src/user/enums/role.enum';

@ApiTags('coupons')
@Controller('coupons')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new coupon' })
  @ApiResponse({ 
    status: 201, 
    description: 'The coupon has been successfully created.',
    type: CouponResponseDto
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: CreateCouponDto })
  create(@Body() createCouponDto: CreateCouponDto, @Request() req): Promise<CouponResponseDto> {
    return this.couponService.create(createCouponDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all coupons with optional filters' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns all coupons matching the criteria.',
    type: [CouponResponseDto]
  })
  @ApiQuery({ name: 'storeId', required: false, description: 'Filter by store ID' })
  @ApiQuery({ name: 'isActive', required: false, description: 'Filter by active status' })
  @ApiQuery({ name: 'category', required: false, description: 'Filter by category' })
  @ApiQuery({ name: 'isVerified', required: false, description: 'Filter by verification status' })
  findAll(
    @Query('storeId') storeId?: string,
    @Query('isActive') isActive?: boolean,
    @Query('category') category?: string,
    @Query('isVerified') isVerified?: boolean
  ): Promise<CouponResponseDto[]> {
    return this.couponService.findAll(storeId, isActive, category, isVerified);
  }

  @Get('active')
  @ApiOperation({ summary: 'Get all active and valid coupons (within date range)' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns all active and valid coupons.',
    type: [CouponResponseDto]
  })
  findActiveAndValid(): Promise<CouponResponseDto[]> {
    return this.couponService.findActiveAndValid();
  }

  @Get('store/:storeId')
  @ApiOperation({ summary: 'Get all coupons for a specific store' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns all coupons for the specified store.',
    type: [CouponResponseDto]
  })
  @ApiParam({ name: 'storeId', description: 'Store ID' })
  findByStore(@Param('storeId', ParseUUIDPipe) storeId: string): Promise<CouponResponseDto[]> {
    return this.couponService.findByStore(storeId);
  }

  @Get('product/:productId')
  @ApiOperation({ summary: 'Get all coupons for a specific product' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns all coupons for the specified product.',
    type: [CouponResponseDto]
  })
  @ApiParam({ name: 'productId', description: 'Product ID' })
  findByProduct(@Param('productId', ParseUUIDPipe) productId: string): Promise<CouponResponseDto[]> {
    return this.couponService.findByProduct(productId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a coupon by ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns the coupon with the specified ID.',
    type: CouponResponseDto
  })
  @ApiResponse({ status: 404, description: 'Coupon not found.' })
  @ApiParam({ name: 'id', description: 'Coupon ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<CouponResponseDto> {
    return this.couponService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a coupon' })
  @ApiResponse({ 
    status: 200, 
    description: 'The coupon has been successfully updated.',
    type: CouponResponseDto
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Coupon not found.' })
  @ApiParam({ name: 'id', description: 'Coupon ID' })
  @ApiBody({ type: UpdateCouponDto })
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateCouponDto: UpdateCouponDto,
    @Request() req
  ): Promise<CouponResponseDto> {
    return this.couponService.update(id, updateCouponDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a coupon' })
  @ApiResponse({ status: 204, description: 'The coupon has been successfully deleted.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Coupon not found.' })
  @ApiParam({ name: 'id', description: 'Coupon ID' })
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.couponService.remove(id);
  }
}
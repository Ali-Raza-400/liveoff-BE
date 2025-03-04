import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query, UseGuards } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { CouponResponseDto } from './dto/coupon-response.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags('coupons')
@Controller('coupons')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new coupon' })
  @ApiResponse({ 
    status: 201, 
    description: 'The coupon has been successfully created.',
    type: CouponResponseDto
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiBody({ type: CreateCouponDto })
  create(@Body() createCouponDto: CreateCouponDto, @Request() req): Promise<CouponResponseDto> {
    return this.couponService.create(createCouponDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all coupons with optional filters' })
  @ApiResponse({ 
    status: 200, 
    description: 'Return all coupons matching the criteria.',
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

  @Get(':id')
  @ApiOperation({ summary: 'Get a coupon by ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Return the coupon with the specified ID.',
    type: CouponResponseDto
  })
  @ApiResponse({ status: 404, description: 'Coupon not found.' })
  @ApiParam({ name: 'id', description: 'Coupon ID' })
  findOne(@Param('id') id: string): Promise<CouponResponseDto> {
    return this.couponService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a coupon' })
  @ApiResponse({ 
    status: 200, 
    description: 'The coupon has been successfully updated.',
    type: CouponResponseDto
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Coupon not found.' })
  @ApiParam({ name: 'id', description: 'Coupon ID' })
  @ApiBody({ type: UpdateCouponDto })
  update(
    @Param('id') id: string, 
    @Body() updateCouponDto: UpdateCouponDto,
    @Request() req
  ): Promise<CouponResponseDto> {
    return this.couponService.update(id, updateCouponDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a coupon' })
  @ApiResponse({ status: 204, description: 'The coupon has been successfully deleted.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Coupon not found.' })
  @ApiParam({ name: 'id', description: 'Coupon ID' })
  remove(@Param('id') id: string): Promise<void> {
    return this.couponService.remove(id);
  }

  @Get('store/:storeId')
  @ApiOperation({ summary: 'Get all coupons for a specific store' })
  @ApiResponse({ 
    status: 200, 
    description: 'Return all coupons for the specified store.',
    type: [CouponResponseDto]
  })
  @ApiParam({ name: 'storeId', description: 'Store ID' })
  findByStore(@Param('storeId') storeId: string): Promise<CouponResponseDto[]> {
    return this.couponService.findByStore(storeId);
  }

  @Get('product/:productId')
  @ApiOperation({ summary: 'Get all coupons for a specific product' })
  @ApiResponse({ 
    status: 200, 
    description: 'Return all coupons for the specified product.',
    type: [CouponResponseDto]
  })
  @ApiParam({ name: 'productId', description: 'Product ID' })
  findByProduct(@Param('productId') productId: string): Promise<CouponResponseDto[]> {
    return this.couponService.findByProduct(productId);
  }

  @Get('active/valid')
  @ApiOperation({ summary: 'Get all active and valid coupons' })
  @ApiResponse({ 
    status: 200, 
    description: 'Return all active and valid coupons.',
    type: [CouponResponseDto]
  })
  findActiveAndValid(): Promise<CouponResponseDto[]> {
    return this.couponService.findActiveAndValid();
  }

  // get stats count
  @Get('stats/count')
  @ApiOperation({ summary: 'Get coupon count' })
  @ApiResponse({ status: 200, description: 'Coupon count fetched successfully' })
  async getCouponCount() {
    return this.couponService.getCouponCount();
  }
  

}
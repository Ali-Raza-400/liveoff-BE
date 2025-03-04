import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ForbiddenException, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/custom-decorators/role_decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { UserRole } from 'src/user/enums/role.enum';

@ApiTags('products')
@ApiBearerAuth()
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
    type: Product
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - user does not have permission to add products to this store.' })
  @ApiBody({ type: CreateProductDto })
  create(@Body() createProductDto: CreateProductDto, @Request() req) {
    return this.productService.create(createProductDto, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all products (admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Return all products.',
    type: [Product]
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - requires admin role.' })
  findAll() {
    return this.productService.findAll();
  }

  @Get('my-products')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all products created by the current user' })
  @ApiResponse({
    status: 200,
    description: 'Return all products created by the current user.',
    type: [Product]
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findMyProducts(@Request() req) {
    return this.productService.findAllByUser(req.user.id);
  }

  @Get('store/:storeId')
  @ApiOperation({ summary: 'Get all products for a specific store' })
  @ApiParam({ name: 'storeId', description: 'Store ID' })
  @ApiResponse({
    status: 200,
    description: 'Return all products for the specified store.',
    type: [Product]
  })
  @ApiResponse({ status: 404, description: 'Store not found.' })
  findByStore(@Param('storeId') storeId: string) {
    return this.productService.findAllByStore(storeId);
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get all featured products' })
  @ApiResponse({
    status: 200,
    description: 'Return all featured products.',
    type: [Product]
  })
  findFeatured() {
    return this.productService.findFeaturedProducts();
  }

  @Get('category/:category')
  @ApiOperation({ summary: 'Get all products by category' })
  @ApiParam({ name: 'category', description: 'Product category' })
  @ApiResponse({
    status: 200,
    description: 'Return all products in the specified category.',
    type: [Product]
  })
  findByCategory(@Param('category') category: string) {
    return this.productService.findProductsByCategory(category);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the product with the specified ID.',
    type: Product
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a product' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully updated.',
    type: Product
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - user does not have permission to update this product.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Request() req) {
    return this.productService.update(id, updateProductDto, req.user.id, req.user.role);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'The product has been successfully deleted.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - user does not have permission to delete this product.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  remove(@Param('id') id: string, @Request() req) {
    return this.productService.remove(id, req.user.id, req.user.role);
  }

  //product stats counts
  @Get('stats/count')
  @ApiOperation({ summary: 'Get product count' })
  @ApiResponse({ status: 200, description: 'Product count fetched successfully' })
  getProductCount() {
    return this.productService.getProductCount();
  }
}
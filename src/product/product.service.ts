import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { StoreService } from '../store/store.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private storeService: StoreService,
  ) { }

  async create(createProductDto: CreateProductDto, userId: string): Promise<Product> {
    // Verify that the store exists and the user has access to it
    const store = await this.storeService.findOne(createProductDto.storeId);

    // Check if the user is the owner of the store or an admin
    if (store.userId !== userId) {
      throw new ForbiddenException('You do not have permission to add products to this store');
    }

    const product = this.productRepository.create({
      ...createProductDto,
      userId,
    });

    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['store', 'user'],
    });
  }

  async findAllProductBySearch(page: number = 1, limit: number = 10, search?: string) {
    const whereCondition = search
      ? { name: ILike(`%${search}%`) } // Case-insensitive search on product name
      : {}; // If no search, return all products
  
    const [products, totalRecords] = await this.productRepository.findAndCount({
      where: whereCondition,
      relations: ['store', 'user'],
      skip: (page - 1) * limit,
      take: limit,
    });
  
    const totalPages = Math.ceil(totalRecords / limit);
  
    return {
      statusCode: 200,
      message: products.length ? 'Products retrieved successfully' : 'No products found',
      data: products,
      metadata: {
        totalRecords,
        itemsPerPage: limit,
        currentPage: page,
        nextPage: page < totalPages ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null,
        totalPages,
      },
    };
  }
  

  async findAllByStore(storeId: string): Promise<Product[]> {
    return this.productRepository.find({
      where: { storeId, isActive: true },
      relations: ['store', 'user'],
    });
  }

  async findAllByUser(userId: string): Promise<Product[]> {
    return this.productRepository.find({
      where: { userId },
      relations: ['store', 'user'],
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['store', 'user'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto, userId: string, userRole: string): Promise<Product> {
    const product = await this.findOne(id);

    // Check if the user is the owner of the product or an admin
    if (product.userId !== userId && userRole !== 'admin') {
      throw new ForbiddenException('You do not have permission to update this product');
    }

    // If storeId is being updated, verify the user has access to the new store
    if (updateProductDto.storeId && updateProductDto.storeId !== product.storeId) {
      const newStore = await this.storeService.findOne(updateProductDto.storeId);
      if (newStore.userId !== userId && userRole !== 'admin') {
        throw new ForbiddenException('You do not have permission to move this product to the specified store');
      }
    }

    await this.productRepository.update(id, updateProductDto);

    return this.findOne(id);
  }

  async remove(id: string, userId: string, userRole: string): Promise<void> {
    const product = await this.findOne(id);

    // Check if the user is the owner of the product or an admin
    if (product.userId !== userId && userRole !== 'admin') {
      throw new ForbiddenException('You do not have permission to delete this product');
    }

    await this.productRepository.delete(id);
  }

  async findFeaturedProducts(): Promise<Product[]> {
    return this.productRepository.find({
      where: { isFeatured: true, isActive: true },
      relations: ['store'],
    });
  }

  async findProductsByCategory(category: string): Promise<Product[]> {
    return this.productRepository.find({
      where: { category, isActive: true },
      relations: ['store'],
    });
  }

  async getProductCount() {
    const count = await this.productRepository.count();
    return { count };
  }
}
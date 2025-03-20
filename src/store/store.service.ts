import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
  ) {}

  async create(createStoreDto: CreateStoreDto, userId: string): Promise<Store> {
    const store = this.storeRepository.create({
      ...createStoreDto,
      userId,
    });
    console.log("store:::", store);
    
    return this.storeRepository.save(store);
  }

  async findAll(): Promise<Store[]> {
    return this.storeRepository.find({
      relations: ['user'],
    });
  }
  async findAllWithSearch(filters?: {
    name?: string;
    isActive?: boolean;
    networkId?: string;
    categoryId?: string;
    page?: number;
    limit?: number;
  }): Promise<any> {
    const query = this.storeRepository.createQueryBuilder('store')
      .leftJoinAndSelect('store.user', 'user');
  
    if (filters?.name) {
      query.andWhere('store.name ILIKE :name', { name: `%${filters.name}%` });
    }
    
    if (filters?.isActive !== undefined) {
      query.andWhere('store.isActive = :isActive', { isActive: filters.isActive });
    }
  
    if (filters?.networkId) {
      query.andWhere('store.networkId = :networkId', { networkId: filters.networkId });
    }
  
    if (filters?.categoryId) {
      query.andWhere('store.categoryId = :categoryId', { categoryId: filters.categoryId });
    }
  
    // Pagination setup
    const page = filters?.page ? Number(filters.page) : 1;
    const limit = filters?.limit ? Number(filters.limit) : 10;
    const offset = (page - 1) * limit;
  
    const [data, totalRecords] = await query
      .skip(offset)
      .take(limit)
      .getManyAndCount();
  
    const totalPages = Math.ceil(totalRecords / limit);
    const nextPage = page < totalPages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;
  
    return {
      statusCode: 200,
      message: 'Stores retrieved successfully',
      data,
      metadata: {
        totalRecords,
        itemsPerPage: limit,
        currentPage: page,
        nextPage,
        prevPage,
        totalPages,
      },
    };
  }
  
  async findAllByUser(userId: string): Promise<Store[]> {
    return this.storeRepository.find({
      where: { userId },
      relations: ['user'],
    });
  }

  async findOne(id: string): Promise<Store> {
    const store = await this.storeRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    
    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }
    
    return store;
  }

  async update(id: string, updateStoreDto: UpdateStoreDto, userId: string, userRole: string): Promise<Store> {
    const store = await this.findOne(id);
    
    // Check if the user is the owner of the store or an admin
    if (store.userId !== userId && userRole !== 'admin') {
      throw new ForbiddenException('You do not have permission to update this store');
    }
    
    await this.storeRepository.update(id, updateStoreDto);
    
    return this.findOne(id);
  }

  async remove(id: string, userId: string, userRole: string): Promise<void> {
    const store = await this.findOne(id);
    
    // Check if the user is the owner of the store or an admin
    if (store.userId !== userId && userRole !== 'admin') {
      throw new ForbiddenException('You do not have permission to delete this store');
    }
    
    await this.storeRepository.delete(id);
  }

  async getStoreCount() {
    const count = await this.storeRepository.count();
    return { count };
  }

  async getStoreWithCouponsAndProducts(storeId: string) {
    const store = await this.storeRepository.findOne({
        where: { id: storeId },
        relations: ['coupons', 'products'],  // Add these relations
    });

    if (!store) {
        throw new NotFoundException(`Store with ID ${storeId} not found`);
    }

    return {
        store
    };
}

}
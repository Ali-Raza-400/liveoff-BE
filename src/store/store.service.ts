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
    console.log("store:::",store)
    
    return this.storeRepository.save(store);
  }

  async findAll(): Promise<Store[]> {
    return this.storeRepository.find({
      relations: ['user'],
    });
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
}
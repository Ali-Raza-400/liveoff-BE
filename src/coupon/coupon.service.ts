import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Coupon } from './entities/coupon.entity';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { CouponResponseDto } from './dto/coupon-response.dto';
import { Product } from '../product/entities/product.entity';
import { Store } from '../store/entities/store.entity';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon)
    private couponRepository: Repository<Coupon>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
  ) { }

  async create(createCouponDto: CreateCouponDto, userId: string): Promise<CouponResponseDto> {
    // Check if store exists
    const store = await this.storeRepository.findOne({ where: { id: createCouponDto.storeId } });
    if (!store) {
      throw new BadRequestException(`Store with ID ${createCouponDto.storeId} not found`);
    }

    // Create new coupon entity
    const coupon = this.couponRepository.create({
      ...createCouponDto,
      userId,
      startDate: new Date(createCouponDto.startDate),
      endDate: new Date(createCouponDto.endDate),
    });

    // Handle product associations if provided
    if (createCouponDto.productIds && createCouponDto.productIds.length > 0) {
      const products = await this.productRepository.find({
        where: { id: In(createCouponDto.productIds) }
      });

      if (products.length !== createCouponDto.productIds.length) {
        throw new BadRequestException('One or more product IDs are invalid');
      }

      coupon.products = products;
    }

    // Save the coupon
    const savedCoupon = await this.couponRepository.save(coupon);

    // Return formatted response
    return CouponResponseDto.fromEntity(savedCoupon);
  }

  async findAll(
    storeId?: string,
    isActive?: boolean,
    category?: string,
    isVerified?: boolean
  ): Promise<CouponResponseDto[]> {
    const queryBuilder = this.couponRepository.createQueryBuilder('coupon')
      .leftJoinAndSelect('coupon.store', 'store')
      .leftJoinAndSelect('coupon.products', 'products');

    // Apply filters if provided
    if (storeId) {
      queryBuilder.andWhere('coupon.storeId = :storeId', { storeId });
    }

    if (isActive !== undefined) {
      queryBuilder.andWhere('coupon.isActive = :isActive', { isActive });
    }

    if (category) {
      queryBuilder.andWhere('coupon.category = :category', { category });
    }

    if (isVerified !== undefined) {
      queryBuilder.andWhere('coupon.isVerified = :isVerified', { isVerified });
    }

    // Order by rank and creation date
    queryBuilder.orderBy('coupon.rank', 'DESC')
      .addOrderBy('coupon.createdAt', 'DESC');

    const coupons = await queryBuilder.getMany();

    return coupons.map(coupon => CouponResponseDto.fromEntity(coupon));
  }



  async findAllCouponBySearch(
    storeId?: string,
    isActive?: boolean,
    category?: string,
    isVerified?: boolean,
    search?: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const queryBuilder = this.couponRepository.createQueryBuilder('coupon')
      .leftJoinAndSelect('coupon.store', 'store')
      .leftJoinAndSelect('coupon.products', 'products');

    // Apply filters if provided
    if (storeId) {
      queryBuilder.andWhere('coupon.storeId = :storeId', { storeId });
    }

    if (isActive !== undefined) {
      queryBuilder.andWhere('coupon.isActive = :isActive', { isActive });
    }

    if (category) {
      queryBuilder.andWhere('coupon.category = :category', { category });
    }

    if (isVerified !== undefined) {
      queryBuilder.andWhere('coupon.isVerified = :isVerified', { isVerified });
    }

    // Apply search filter on coupon name
    if (search) {
      queryBuilder.andWhere('LOWER(coupon.name) LIKE LOWER(:search)', { search: `%${search}%` });
    }

    // Get total count before pagination
    const totalRecords = await queryBuilder.getCount();
    const totalPages = Math.ceil(totalRecords / limit);
    const offset = (page - 1) * limit;

    queryBuilder.skip(offset).take(limit);

    // Order by rank and creation date
    queryBuilder.orderBy('coupon.rank', 'DESC').addOrderBy('coupon.createdAt', 'DESC');

    const coupons = await queryBuilder.getMany();

    return {
      data: coupons.map((coupon) => CouponResponseDto.fromEntity(coupon)),
      metadata: {
        totalRecords,
        itemsPerPage: limit.toString(),
        currentPage: page.toString(),
        nextPage: page < totalPages ? (page + 1).toString() : null,
        prevPage: page > 1 ? (page - 1).toString() : null,
        totalPages: totalPages.toString(),
      },
    };
  }

  async findOne(id: string): Promise<CouponResponseDto> {
    const coupon = await this.couponRepository.findOne({
      where: { id },
      relations: ['store', 'products']
    });

    if (!coupon) {
      throw new NotFoundException(`Coupon with ID ${id} not found`);
    }

    return CouponResponseDto.fromEntity(coupon);
  }

  async update(id: string, updateCouponDto: UpdateCouponDto, userId: string): Promise<CouponResponseDto> {
    const coupon = await this.couponRepository.findOne({
      where: { id },
      relations: ['products']
    });

    if (!coupon) {
      throw new NotFoundException(`Coupon with ID ${id} not found`);
    }

    // Handle date conversions if provided
    if (updateCouponDto.startDate) {
      updateCouponDto.startDate = new Date(updateCouponDto.startDate).toISOString();
    }

    if (updateCouponDto.endDate) {
      updateCouponDto.endDate = new Date(updateCouponDto.endDate).toISOString();
    }

    // Handle product associations if provided
    if (updateCouponDto.productIds) {
      const products = await this.productRepository.find({
        where: { id: In(updateCouponDto.productIds) }
      });

      if (products.length !== updateCouponDto.productIds.length) {
        throw new BadRequestException('One or more product IDs are invalid');
      }

      coupon.products = products;

      // Remove productIds from DTO as it's not a direct column
      delete updateCouponDto.productIds;
    }

    // Update the coupon
    Object.assign(coupon, updateCouponDto);

    const updatedCoupon = await this.couponRepository.save(coupon);
    return CouponResponseDto.fromEntity(updatedCoupon);
  }

  async remove(id: string): Promise<void> {
    const result = await this.couponRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Coupon with ID ${id} not found`);
    }
  }

  async findByStore(storeId: string): Promise<CouponResponseDto[]> {
    const coupons = await this.couponRepository.find({
      where: { storeId, isActive: true },
      relations: ['products'],
      order: { rank: 'DESC', createdAt: 'DESC' }
    });

    return coupons.map(coupon => CouponResponseDto.fromEntity(coupon));
  }

  async findByProduct(productId: string): Promise<CouponResponseDto[]> {
    const coupons = await this.couponRepository
      .createQueryBuilder('coupon')
      .innerJoinAndSelect('coupon.products', 'product', 'product.id = :productId', { productId })
      .leftJoinAndSelect('coupon.store', 'store')
      .where('coupon.isActive = :isActive', { isActive: true })
      .orderBy('coupon.rank', 'DESC')
      .addOrderBy('coupon.createdAt', 'DESC')
      .getMany();

    return coupons.map(coupon => CouponResponseDto.fromEntity(coupon));
  }

  async findActiveAndValid(): Promise<CouponResponseDto[]> {
    const now = new Date();

    const coupons = await this.couponRepository
      .createQueryBuilder('coupon')
      .leftJoinAndSelect('coupon.store', 'store')
      .leftJoinAndSelect('coupon.products', 'products')
      .where('coupon.isActive = :isActive', { isActive: true })
      .andWhere('coupon.startDate <= :now', { now })
      .andWhere('coupon.endDate >= :now', { now })
      .orderBy('coupon.rank', 'DESC')
      .addOrderBy('coupon.createdAt', 'DESC')
      .getMany();

    return coupons.map(coupon => CouponResponseDto.fromEntity(coupon));
  }

  async getCouponCount() {
    const count = await this.couponRepository.count();
    return { count };
  }

}
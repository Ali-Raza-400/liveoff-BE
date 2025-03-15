import { Repository } from 'typeorm';
import { Coupon } from './entities/coupon.entity';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { CouponResponseDto } from './dto/coupon-response.dto';
import { Product } from '../product/entities/product.entity';
import { Store } from '../store/entities/store.entity';
export declare class CouponService {
    private couponRepository;
    private productRepository;
    private storeRepository;
    constructor(couponRepository: Repository<Coupon>, productRepository: Repository<Product>, storeRepository: Repository<Store>);
    create(createCouponDto: CreateCouponDto, userId: string): Promise<CouponResponseDto>;
    findAll(storeId?: string, isActive?: boolean, category?: string, isVerified?: boolean): Promise<CouponResponseDto[]>;
    findOne(id: string): Promise<CouponResponseDto>;
    update(id: string, updateCouponDto: UpdateCouponDto, userId: string): Promise<CouponResponseDto>;
    remove(id: string): Promise<void>;
    findByStore(storeId: string): Promise<CouponResponseDto[]>;
    findByProduct(productId: string): Promise<CouponResponseDto[]>;
    findActiveAndValid(): Promise<CouponResponseDto[]>;
    getCouponCount(): Promise<{
        count: number;
    }>;
}

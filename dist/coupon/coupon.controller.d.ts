import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { CouponResponseDto } from './dto/coupon-response.dto';
export declare class CouponController {
    private readonly couponService;
    constructor(couponService: CouponService);
    create(createCouponDto: CreateCouponDto, req: any): Promise<CouponResponseDto>;
    findAll(storeId?: string, isActive?: boolean, category?: string, isVerified?: boolean): Promise<CouponResponseDto[]>;
    findOne(id: string): Promise<CouponResponseDto>;
    update(id: string, updateCouponDto: UpdateCouponDto, req: any): Promise<CouponResponseDto>;
    remove(id: string): Promise<void>;
    findByStore(storeId: string): Promise<CouponResponseDto[]>;
    findByProduct(productId: string): Promise<CouponResponseDto[]>;
    findActiveAndValid(): Promise<CouponResponseDto[]>;
    getCouponCount(): Promise<{
        count: number;
    }>;
}

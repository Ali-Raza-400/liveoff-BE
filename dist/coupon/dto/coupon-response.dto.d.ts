import { Coupon } from '../entities/coupon.entity';
export declare class CouponResponseDto {
    id: string;
    name: string;
    detail: string;
    code: string | null;
    htmlCodeUrl: string | null;
    startDate: Date;
    endDate: Date;
    category: string;
    rank: number;
    isFreeShipping: boolean;
    isExclusive: boolean;
    isVerified: boolean;
    showOnHomePage: boolean;
    isTopCategory: boolean;
    mainImage: string | null;
    secondaryImage: string | null;
    codeImage: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    storeId: string;
    store?: {
        id: string;
        name: string;
        logoUrl?: string;
    };
    products?: Array<{
        id: string;
        name: string;
        currentPrice: number;
        imageUrl?: string;
    }>;
    static fromEntity(coupon: Coupon): CouponResponseDto;
}

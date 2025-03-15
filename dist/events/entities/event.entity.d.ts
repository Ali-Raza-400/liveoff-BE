import { Store } from '../../store/entities/store.entity';
import { Coupon } from '../../coupon/entities/coupon.entity';
export declare class Event {
    id: string;
    title: string;
    descriptionHeading: string;
    description: string;
    extraDescriptionHeading: string;
    extraDescriptionContent: string;
    startDate: Date;
    endDate: Date;
    bannerImage: string;
    metaDescription: string;
    seoKeywords: string[];
    isFeatured: boolean;
    isTrending: boolean;
    viewCount: number;
    termsAndConditions: string;
    stores: Store[];
    coupons: Coupon[];
    createdAt: Date;
    updatedAt: Date;
}

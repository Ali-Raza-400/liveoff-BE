import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';
import { Coupon } from '../../coupon/entities/coupon.entity';
import { Network } from 'src/network/entities/network.entity';
import { Category } from 'src/category/entities/category.entity';
import { Event } from 'src/events/entities/event.entity';
export declare class FAQ {
    question: string;
    answer: string;
}
export declare class Store {
    id: string;
    name: string;
    secondaryName: string;
    headingH1: string;
    headingH2: string;
    storeId: string;
    storeUrl: string;
    network: string;
    htmlCode: string;
    impressionCode: string;
    storeTitle: string;
    categories: string[];
    isPopularStore: boolean;
    isFeatureStore: boolean;
    isCategoryFeatureStore: boolean;
    logoUrl: string;
    thumbnailUrl: string;
    isActive: boolean;
    metaDescription: string;
    storeDescription: string;
    storeArticle: string;
    faqs: FAQ[];
    createdAt: Date;
    updatedAt: Date;
    user: User;
    userId: string;
    products: Product[];
    coupons: Coupon[];
    networkEntity: Network;
    networkId: string;
    category: Category;
    categoryId: string;
    events: Event[];
}

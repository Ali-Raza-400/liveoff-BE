import { Store } from '../../store/entities/store.entity';
import { Product } from '../../product/entities/product.entity';
import { Coupon } from '../../coupon/entities/coupon.entity';
import { Blog } from '../../blogs/entities/blog.entity';
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    permissions: string[];
    createdByAdminId: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    stores: Store[];
    products: Product[];
    coupons: Coupon[];
    blogs: Promise<Blog[]>;
}

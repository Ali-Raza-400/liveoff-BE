import { Store } from '../../store/entities/store.entity';
import { Product } from '../../product/entities/product.entity';
import { Coupon } from '../../coupon/entities/coupon.entity';
import { Network } from '../../network/entities/network.entity';
import { Blog } from 'src/blogs/entities/blog.entity';
export declare class Category {
    id: string;
    categoryName: string;
    categoryTitle: string;
    categoryDescription: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    networks: Network[];
    stores: Store[];
    products: Product[];
    coupons: Coupon[];
    blogs: Blog[];
}

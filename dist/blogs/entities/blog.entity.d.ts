import { Category } from '../../category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';
export declare class Blog {
    id: string;
    title: string;
    content: string;
    featuredImage: string;
    metaDescription: string;
    isFeatured: boolean;
    featuredAt: Date | null;
    isTrending: boolean;
    isLatest: boolean;
    viewCount: number;
    category: Category;
    createdAt: Date;
    updatedAt: Date;
    author: Promise<User>;
}

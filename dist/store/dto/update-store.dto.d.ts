import { CreateStoreDto, FAQDto } from './create-store.dto';
declare const UpdateStoreDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateStoreDto>>;
export declare class UpdateStoreDto extends UpdateStoreDto_base {
    name?: string;
    secondaryName?: string;
    headingH1?: string;
    headingH2?: string;
    storeId?: string;
    storeUrl?: string;
    network?: string;
    htmlCode?: string;
    impressionCode?: string;
    storeTitle?: string;
    categories?: string[];
    isPopularStore?: boolean;
    isFeatureStore?: boolean;
    isCategoryFeatureStore?: boolean;
    logoUrl?: string;
    thumbnailUrl?: string;
    isActive?: boolean;
    faqs?: FAQDto[];
}
export {};

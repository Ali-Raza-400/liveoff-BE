export declare class CreateCouponDto {
    name: string;
    detail: string;
    code?: string;
    htmlCodeUrl?: string;
    startDate: string;
    endDate: string;
    category: string;
    rank?: number;
    isFreeShipping?: boolean;
    isExclusive?: boolean;
    isVerified?: boolean;
    showOnHomePage?: boolean;
    isTopCategory?: boolean;
    mainImage?: string;
    secondaryImage?: string;
    codeImage?: string;
    isActive?: boolean;
    storeId: string;
    productIds?: string[];
    eventIds?: string[];
}

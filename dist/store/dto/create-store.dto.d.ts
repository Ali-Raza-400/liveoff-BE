export declare class FAQDto {
    question: string;
    answer: string;
}
export declare class CreateStoreDto {
    name: string;
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
    metaDescription?: string;
    storeDescription?: string;
    storeArticle?: string;
    faqs?: FAQDto[];
    eventIds?: string[];
}

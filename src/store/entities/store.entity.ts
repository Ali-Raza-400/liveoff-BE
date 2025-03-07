import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';
import { Coupon } from '../../coupon/entities/coupon.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Network } from 'src/network/entities/network.entity';
import { Category } from 'src/category/entities/category.entity';

// Define a class for FAQ items
export class FAQ {
    @ApiProperty({
        description: 'The question for the FAQ',
        example: 'How do I return an item?'
    })
    question: string;

    @ApiProperty({
        description: 'The answer to the FAQ question',
        example: 'You can return items within 30 days of purchase by visiting our returns page.'
    })
    answer: string;
}

@Entity()
export class Store {
    @ApiProperty({
        description: 'Unique identifier for the store',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'The name of the store',
        example: 'My Awesome Store'
    })
    @Column()
    name: string;

    @ApiProperty({
        description: 'Secondary name or tagline for the store',
        example: 'Best Deals Online',
        nullable: true
    })
    @Column({ nullable: true })
    secondaryName: string;

    @ApiProperty({
        description: 'Primary heading for the store page',
        example: 'Welcome to Our Store',
        nullable: true
    })
    @Column({ nullable: true })
    headingH1: string;

    @ApiProperty({
        description: 'Secondary heading for the store page',
        example: 'Find the Best Deals',
        nullable: true
    })
    @Column({ nullable: true })
    headingH2: string;

    @ApiProperty({
        description: 'Unique identifier for the store in the system',
        example: 'store-123',
        nullable: true
    })
    @Column({ nullable: true })
    storeId: string;

    @ApiProperty({
        description: 'URL of the store website',
        example: 'https://www.mystore.com',
        nullable: true
    })
    @Column({ nullable: true })
    storeUrl: string;

    @ApiProperty({
        description: 'Network the store belongs to',
        example: 'Retail Network',
        nullable: true
    })
    @Column({ nullable: true })
    network: string;

    @ApiProperty({
        description: 'HTML code for embedding store content',
        example: '<div class="store-embed">Store content</div>',
        nullable: true
    })
    @Column({ nullable: true })
    htmlCode: string;

    @ApiProperty({
        description: 'Code for tracking impressions',
        example: '<script>trackImpression("store-123")</script>',
        nullable: true
    })
    @Column({ nullable: true })
    impressionCode: string;

    @ApiProperty({
        description: 'Title for the store page',
        example: 'My Store - Best Deals Online',
        nullable: true
    })
    @Column({ nullable: true })
    storeTitle: string;

    @ApiProperty({
        description: 'Categories the store belongs to',
        example: ['Electronics', 'Home Appliances', 'Gadgets'],
        nullable: true,
        type: [String]
    })
    @Column('simple-array', { nullable: true })
    categories: string[];

    @ApiProperty({
        description: 'Flag indicating if this is a popular store',
        example: true,
        default: false
    })
    @Column({ default: false })
    isPopularStore: boolean;

    @ApiProperty({
        description: 'Flag indicating if this is a featured store',
        example: false,
        default: false
    })
    @Column({ default: false })
    isFeatureStore: boolean;

    @ApiProperty({
        description: 'Flag indicating if this is a category featured store',
        example: true,
        default: false
    })
    @Column({ default: false })
    isCategoryFeatureStore: boolean;

    @ApiProperty({
        description: 'URL to the store logo image',
        example: 'https://example.com/store-logo.png',
        nullable: true
    })
    @Column({ nullable: true })
    logoUrl: string;

    @ApiProperty({
        description: 'URL to the store thumbnail image',
        example: 'https://example.com/store-thumbnail.png',
        nullable: true
    })
    @Column({ nullable: true })
    thumbnailUrl: string;

    @ApiProperty({
        description: 'Flag indicating if the store is active',
        example: true,
        default: true
    })
    @Column({ default: true })
    isActive: boolean;

    // New SEO Fields
    @ApiProperty({
        description: 'Meta description for SEO',
        example: 'Find the best deals at My Awesome Store. Shop now for exclusive offers.',
        nullable: true
    })
    @Column({ nullable: true })
    metaDescription: string;

    @ApiProperty({
        description: 'Store description for SEO',
        example: 'My Awesome Store offers a wide range of products at competitive prices.',
        nullable: true
    })
    @Column({ nullable: true })
    storeDescription: string;

    @ApiProperty({
        description: 'HTML content for the store article/description',
        example: '<p>Welcome to our store. We offer the best products...</p>',
        nullable: true
    })
    @Column({ type: 'text', nullable: true })
    storeArticle: string;

    // New FAQ field
    @ApiProperty({
        description: 'Frequently Asked Questions for the store',
        example: [
            {
                question: 'How do I return an item?',
                answer: 'You can return items within 30 days of purchase by visiting our returns page.'
            },
            {
                question: 'Do you offer international shipping?',
                answer: 'Yes, we ship to most countries worldwide. Shipping costs vary by location.'
            }
        ],
        nullable: true,
        type: [FAQ]
    })
    @Column('json', { nullable: true, default: '[]' })
    faqs: FAQ[];

    @ApiProperty({
        description: 'Date when the store was created',
        example: '2023-01-01T00:00:00Z'
    })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({
        description: 'Date when the store was last updated',
        example: '2023-01-02T00:00:00Z'
    })
    @UpdateDateColumn()
    updatedAt: Date;

    // Relationship with User
    @ManyToOne(() => User, user => user.stores)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ApiProperty({
        description: 'ID of the user who owns this store',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @Column()
    userId: string;

    // Relationship with Products - one store can have many products
    @OneToMany(() => Product, product => product.store)
    products: Product[];

    // Relationship with Coupons - one store can have many coupons
    @OneToMany(() => Coupon, coupon => coupon.store)
    coupons: Coupon[];

    @ManyToOne(() => Network, (network) => network.stores, { nullable: true })
    @JoinColumn({ name: 'networkId' })
    networkEntity: Network;

    @Column({ nullable: true })
    networkId: string;

    @ManyToOne(() => Category, category => category.stores)
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @Column({ nullable: true })
    categoryId: string;


}
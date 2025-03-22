import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, ManyToMany, OneToMany } from 'typeorm';
import { Store } from '../../store/entities/store.entity';
import { User } from '../../user/entities/user.entity';
import { Coupon } from '../../coupon/entities/coupon.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/category/entities/category.entity';
import { Code } from 'src/code/entities/code.entity';

@Entity()
export class Product {
    @ApiProperty({
        description: 'Unique identifier for the product',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'The store this product belongs to',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @Column()
    storeId: string;

    @ApiProperty({
        description: 'The name of the product',
        example: 'LP electric guitar'
    })
    @Column()
    name: string;

    @ApiProperty({
        description: 'Product heading or title',
        example: 'Donner DLP-124S LP Electric Guitar Kit'
    })
    @Column()
    heading: string;

    @ApiProperty({
        description: 'Old price of the product',
        example: '149.99',
        nullable: true
    })
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    oldPrice: number;

    @ApiProperty({
        description: 'Current price of the product',
        example: '129.99'
    })
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    currentPrice: number;

    @ApiProperty({
        description: 'Detailed description of the product',
        example: 'This DLP-124S LP electric guitar kit features a sunburst yellow body with bag, strap, cable, and more accessories.'
    })
    @Column({ type: 'text' })
    detail: string;

    @ApiProperty({
        description: 'URL to the product image',
        example: 'https://example.com/product-image.jpg',
        nullable: true
    })
    @Column({ nullable: true })
    imageUrl: string;

    @ApiProperty({
        description: 'HTML URL for the product',
        example: 'https://to.tradetracker.net/?c=24226&m=12&a=374223&r=&u=',
        nullable: true
    })
    @Column({ nullable: true })
    htmlUrl: string;

    @ApiProperty({
        description: 'Category of the product',
        example: 'Electronics'
    })
    @Column()
    category: string;

    @ApiProperty({
        description: 'Stock Keeping Unit (SKU) of the product',
        example: 'EC1276'
    })
    @Column()
    sku: string;

    @ApiProperty({
        description: 'Size of the product',
        example: '39 inch',
        nullable: true
    })
    @Column({ nullable: true })
    size: string;

    @ApiProperty({
        description: 'Color of the product',
        example: 'Sunburst Yellow',
        nullable: true
    })
    @Column({ nullable: true })
    color: string;

    @ApiProperty({
        description: 'Material of the product',
        example: 'AAA Solid Poplar',
        nullable: true
    })
    @Column({ nullable: true })
    material: string;

    @ApiProperty({
        description: 'Flag indicating if this is a featured product',
        example: true,
        default: false
    })
    @Column({ default: false })
    isFeatured: boolean;

    @ApiProperty({
        description: 'Flag indicating if the product is active',
        example: true,
        default: true
    })
    @Column({ default: true })
    isActive: boolean;

    @ApiProperty({
        description: 'Date when the product was created',
        example: '2023-01-01T00:00:00Z'
    })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({
        description: 'Date when the product was last updated',
        example: '2023-01-02T00:00:00Z'
    })
    @UpdateDateColumn()
    updatedAt: Date;

    @ApiProperty({
        description: 'ID of the user who created this product',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @Column()
    userId: string;

    // Relationships
    @ManyToOne(() => Store, store => store.products)
    @JoinColumn({ name: 'storeId' })
    store: Store;

    @ManyToOne(() => User, user => user.products)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToMany(() => Coupon, coupon => coupon.products)
    coupons: Coupon[];

    @ManyToOne(() => Category, category => category.products)
    @JoinColumn({ name: 'categoryId' })
    categoryEntity: Category;

    @Column({ nullable: true })
    categoryId: string;

    @OneToMany(() => Code, (code) => code.product, { nullable: true })
    codes?: Code[];

}
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Store } from '../../store/entities/store.entity';
import { Product } from '../../product/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/category/entities/category.entity';
import { Event } from 'src/events/entities/event.entity';
import { Code } from 'src/code/entities/code.entity';

@Entity()
export class Coupon {
    @ApiProperty({
        description: 'Unique identifier for the coupon',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'The name of the coupon',
        example: '€350 De Reduction Promo'
    })
    @Column()
    name: string;

    @ApiProperty({
        description: 'Detailed description of the coupon',
        example: 'Christmas Sale! Get up to €350 off on your purchase when you shop through this landing page.'
    })
    @Column({ type: 'text' })
    detail: string;

    @ApiProperty({
        description: 'The coupon code',
        example: 'SAVE350',
        nullable: true
    })
    @Column({ nullable: true })
    code: string;

    @ApiProperty({
        description: 'HTML code URL for the coupon',
        example: 'https://clk.tradedoubler.com/click?p=311962&a=3237124&url=https%3A%2F%2Fr.donner-music.com',
        nullable: true
    })
    @Column({ nullable: true })
    htmlCodeUrl: string;

    @ApiProperty({
        description: 'Start date of the coupon validity',
        example: '2023-12-01T00:00:00Z'
    })
    @Column()
    startDate: Date;

    @ApiProperty({
        description: 'End date of the coupon validity',
        example: '2023-12-31T23:59:59Z'
    })
    @Column()
    endDate: Date;

    @ApiProperty({
        description: 'Category of the coupon',
        example: 'Electronics'
    })
    @Column()
    category: string;

    @ApiProperty({
        description: 'Rank of the coupon for sorting',
        example: 2,
        default: 0
    })
    @Column({ default: 0 })
    rank: number;

    @ApiProperty({
        description: 'Flag indicating if this is a free shipping coupon',
        example: false,
        default: false
    })
    @Column({ default: false })
    isFreeShipping: boolean;

    @ApiProperty({
        description: 'Flag indicating if this coupon is exclusive',
        example: false,
        default: false
    })
    @Column({ default: false })
    isExclusive: boolean;

    @ApiProperty({
        description: 'Flag indicating if this coupon is verified',
        example: true,
        default: false
    })
    @Column({ default: false })
    isVerified: boolean;

    @ApiProperty({
        description: 'Flag indicating if this coupon should be shown on the home page',
        example: false,
        default: false
    })
    @Column({ default: false })
    showOnHomePage: boolean;

    @ApiProperty({
        description: 'Flag indicating if this coupon is a top category coupon',
        example: false,
        default: false
    })
    @Column({ default: false })
    isTopCategory: boolean;

    @ApiProperty({
        description: 'Main image for the coupon',
        example: '€350',
        nullable: true
    })
    @Column({ nullable: true })
    mainImage: string;

    @ApiProperty({
        description: 'Secondary image for the coupon',
        example: 'De Reduction',
        nullable: true
    })
    @Column({ nullable: true })
    secondaryImage: string;

    @ApiProperty({
        description: 'Code image for the coupon',
        example: 'Code',
        nullable: true
    })
    @Column({ nullable: true })
    codeImage: string;

    @ApiProperty({
        description: 'Flag indicating if the coupon is active',
        example: true,
        default: true
    })
    @Column({ default: true })
    isActive: boolean;

    @ApiProperty({
        description: 'Date when the coupon was created',
        example: '2023-01-01T00:00:00Z'
    })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({
        description: 'Date when the coupon was last updated',
        example: '2023-01-02T00:00:00Z'
    })
    @UpdateDateColumn()
    updatedAt: Date;

    @ApiProperty({
        description: 'ID of the store this coupon belongs to',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @Column()
    storeId: string;

    @ApiProperty({
        description: 'ID of the user who created this coupon',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @Column()
    userId: string;

    // Relationships
    @ManyToOne(() => Store, store => store.coupons)
    @JoinColumn({ name: 'storeId' })
    store: Store;

    @ManyToOne(() => User, user => user.coupons)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToMany(() => Product)
    @JoinTable({
        name: 'coupon_products',
        joinColumn: { name: 'couponId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'productId', referencedColumnName: 'id' }
    })
    products: Product[];

    @ManyToOne(() => Category, category => category.coupons)
    @JoinColumn({ name: 'categoryId' })
    categoryEntity: Category;

    @Column({ nullable: true })
    categoryId: string;

    @ManyToMany(() => Event, (event) => event.coupons)
    events: Event[];

    @OneToOne(() => Code, (code) => code.coupon, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn()
    codes?: Code;

}
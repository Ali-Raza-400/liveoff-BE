import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Store } from '../../store/entities/store.entity';
import { Coupon } from '../../coupon/entities/coupon.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Event {
    @ApiProperty({ description: 'Unique identifier for the event' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'Title of the event', example: 'Christmas Deals 2025' })
    @Column()
    title: string;

    @ApiProperty({ description: 'Event heading for the first description section', example: 'Christmas Deals 2025' })
    @Column({ nullable: true })
    descriptionHeading: string;

    @ApiProperty({ description: 'Main event description', example: 'Undoubtedly the biggest shopping holiday...' })
    @Column({ type: 'text' })
    description: string;

    @ApiProperty({ description: 'Additional heading for extended event details', example: 'What Does Size-Inclusive Mean?' })
    @Column({ nullable: true })
    extraDescriptionHeading: string;

    @ApiProperty({ description: 'Extra content section for the event', example: 'If savings are in, we predict that you will succeed...' })
    @Column({ type: 'text', nullable: true })
    extraDescriptionContent: string;

    @ApiProperty({ description: 'Event start date', example: '2025-12-01T00:00:00Z' })
    @Column()
    startDate: Date;

    @ApiProperty({ description: 'Event end date', example: '2025-12-31T23:59:59Z' })
    @Column()
    endDate: Date;

    @ApiProperty({ description: 'Event banner image URL', example: 'https://example.com/banner.jpg' })
    @Column({ nullable: true })
    bannerImage: string;

    @ApiProperty({ description: 'SEO meta description for search engines', example: 'Get the best Christmas deals of 2025' })
    @Column({ nullable: true })
    metaDescription: string;

    @ApiProperty({ description: 'SEO keywords for better search visibility', example: ['Christmas Deals', 'Best Offers', 'Holiday Discounts'] })
    @Column('simple-array', { nullable: true })
    seoKeywords: string[];

    @ApiProperty({ description: 'Indicates whether the event is featured on the homepage', example: true })
    @Column({ default: false })
    isFeatured: boolean;

    @ApiProperty({ description: 'Indicates whether the event is trending based on popularity', example: true })
    @Column({ default: false })
    isTrending: boolean;

    @ApiProperty({ description: 'Total number of views for the event', example: 5000 })
    @Column({ default: 0 })
    viewCount: number;

    @ApiProperty({ description: 'Terms and conditions related to the event', example: 'Limited to the first 500 customers' })
    @Column({ type: 'text', nullable: true })
    termsAndConditions: string;

    @ApiProperty({ description: 'List of associated stores' })
    @ManyToMany(() => Store, (store) => store.events)
    @JoinTable()
    stores: Store[];

    @ApiProperty({ description: 'List of associated coupons' })
    @ManyToMany(() => Coupon, (coupon) => coupon.events)
    @JoinTable()
    coupons: Coupon[];

    @ApiProperty({ description: 'Event creation timestamp', example: '2025-03-14T15:17:48.987Z' })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ description: 'Last update timestamp for the event', example: '2025-03-14T15:17:48.987Z' })
    @UpdateDateColumn()
    updatedAt: Date;
}

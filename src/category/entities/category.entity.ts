import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Store } from '../../store/entities/store.entity';
import { Product } from '../../product/entities/product.entity';
import { Coupon } from '../../coupon/entities/coupon.entity';
import { Network } from '../../network/entities/network.entity';

@Entity()
export class Category {
    @ApiProperty({ description: 'Unique identifier for the category' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'Name of the category' })
    @Column()
    categoryName: string;

    @ApiProperty({ description: 'Title of the category' })
    @Column()
    categoryTitle: string;

    @ApiProperty({ description: 'Description of the category', nullable: true })
    @Column({ nullable: true })
    categoryDescription: string;

    @ApiProperty({ description: 'Image URL of the category', nullable: true })
    @Column({ nullable: true })
    image: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // Relationships
    @OneToMany(() => Network, network => network.category)
    networks: Network[];

    @OneToMany(() => Store, store => store.category)
    stores: Store[];

    @OneToMany(() => Product, product => product.categoryEntity)
    products: Product[];

    @OneToMany(() => Coupon, coupon => coupon.categoryEntity)
    coupons: Coupon[];
}

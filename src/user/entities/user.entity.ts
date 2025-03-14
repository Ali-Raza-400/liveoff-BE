import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Store } from '../../store/entities/store.entity';
import { Product } from '../../product/entities/product.entity';
import { Coupon } from '../../coupon/entities/coupon.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Blog } from '../../blogs/entities/blog.entity';

@Entity()
export class User {
    @ApiProperty({
        description: 'Unique identifier for the user',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'The name of the user',
        example: 'John Doe'
    })
    @Column()
    name: string;

    @ApiProperty({
        description: 'Email address of the user',
        example: 'john.doe@example.com'
    })
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @ApiProperty({
        description: 'Role of the user in the system',
        example: 'user',
        default: 'user'
    })
    @Column({ default: 'user' }) 
    role: string; // 'admin' or 'user' (basic role)

    @ApiProperty({
        description: 'Specific permissions assigned to the user',
        example: ['read_dashboard', 'edit_profile', 'manage_users'],
        nullable: true
    })
    @Column('simple-array', { nullable: true })
    permissions: string[]; // example: ["read_dashboard", "edit_profile", "manage_users"]

    @ApiProperty({
        description: 'ID of the admin who created this user',
        example: 1,
        nullable: true
    })
    @Column({ nullable: true })
    createdByAdminId: number; // track which admin created this user (optional)

    @ApiProperty({
        description: 'Flag indicating if the user account is active',
        example: true,
        default: true
    })
    @Column({ default: true })
    isActive: boolean;

    @ApiProperty({
        description: 'Date when the user was created',
        example: '2023-01-01T00:00:00Z'
    })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({
        description: 'Date when the user was last updated',
        example: '2023-01-02T00:00:00Z'
    })
    @UpdateDateColumn()
    updatedAt: Date;

    // Relationship with Store - one user can have many stores
    @OneToMany(() => Store, store => store.user)
    stores: Store[];

    // Relationship with Product - one user can create many products
    @OneToMany(() => Product, product => product.user)
    products: Product[];

    // Relationship with Coupon - one user can create many coupons
    @OneToMany(() => Coupon, coupon => coupon.user)
    coupons: Coupon[];

    @ApiProperty({ description: 'Blogs created by the user' })
    @OneToMany(() => Blog, (blog) => blog.author, { lazy: true }) // Lazy relation
    blogs: Promise<Blog[]>;
}
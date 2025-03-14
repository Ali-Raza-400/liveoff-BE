import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Blog {
    @ApiProperty({ description: 'Unique identifier for the blog' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'Title of the blog post' })
    @Column()
    title: string;

    @ApiProperty({ description: 'Content of the blog post' })
    @Column('text')
    content: string;

    @ApiProperty({ description: 'Featured image URL of the blog post' })
    @Column({ nullable: true })
    featuredImage: string;

    @ApiProperty({ description: 'Meta description for SEO' })
    @Column({ nullable: true })
    metaDescription: string;

    @ApiProperty({ description: 'Whether the blog post is featured' })
    @Column({ default: false })
    isFeatured: boolean;

    @ApiProperty({ description: 'Date and time when the blog was featured', nullable: true })
    @Column({ type: 'timestamp', nullable: true })
    featuredAt: Date | null; // Track when the blog was featured

    @ApiProperty({ description: 'Whether the blog post is trending' })
    @Column({ default: false })
    isTrending: boolean;

    @ApiProperty({ description: 'Whether the blog post is latest' })
    @Column({ default: true })
    isLatest: boolean;

    @ApiProperty({ description: 'View count of the blog post' })
    @Column({ default: 0 })
    viewCount: number;

    @ManyToOne(() => Category, category => category.blogs)
    category: Category;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ApiProperty({ description: 'User who created the blog' })
    @ManyToOne(() => User, (user) => user.blogs, { lazy: true, nullable: false }) // Lazy relation
    author: Promise<User>;
}
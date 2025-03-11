import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../category/entities/category.entity';

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
}
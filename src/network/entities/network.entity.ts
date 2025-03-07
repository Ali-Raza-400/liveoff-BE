import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Store } from '../../store/entities/store.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/category/entities/category.entity';

@Entity()
export class Network {
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Unique ID for the network' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ example: 'Retail Network', description: 'Name of the network' })
    @Column()
    name: string;

    @ApiProperty({ example: 'active', enum: ['active', 'inactive'], description: 'Status of the network' })
    @Column({ type: 'enum', enum: ['active', 'inactive'], default: 'active' })
    status: 'active' | 'inactive';

    @ApiProperty({ type: () => [Store], description: 'Stores under this network' })
    @OneToMany(() => Store, (store) => store.networkEntity)
    stores: Store[];

    @ApiProperty({ description: 'Date when network was created', example: '2023-01-01T00:00:00Z' })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ description: 'Date when network was last updated', example: '2023-01-02T00:00:00Z' })
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Category, category => category.networks)
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @Column({ nullable: true })
    categoryId: string;

}

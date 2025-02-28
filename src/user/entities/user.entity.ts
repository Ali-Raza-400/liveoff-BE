import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: 'user' }) 
    role: string; // 'admin' or 'user' (basic role)

    @Column('simple-array', { nullable: true })
    permissions: string[]; // example: ["read_dashboard", "edit_profile", "manage_users"]

    @Column({ nullable: true })
    createdByAdminId: number; // track which admin created this user (optional)

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

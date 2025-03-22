import { Coupon } from "src/coupon/entities/coupon.entity";
import { Product } from "src/product/entities/product.entity";
import { Store } from "src/store/entities/store.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class Code {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    code: string;
    
    @Column({ nullable: true })
    description?: string;

    @Column({ nullable: true })
    type?: string; // New field for categorizing codes (e.g., "shipping", "discount")

    @OneToOne(() => Coupon, (coupon) => coupon.code, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn()  // ✅ Ensure @JoinColumn is present for @OneToOne relations
    coupon?: Coupon;

    @ManyToOne(() => Store, (store) => store.codes, { nullable: true, onDelete: "SET NULL" })
    store?: Store;

    @ManyToOne(() => Product, (product) => product.codes, { nullable: true, onDelete: "SET NULL" })
    product?: Product;
}

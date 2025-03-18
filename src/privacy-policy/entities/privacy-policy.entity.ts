import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
@Entity('privacy_policies')
export class PrivacyPolicy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb')
  questions: {
    question: string;
    answer: string;
  }[];

  @ApiProperty({
    description: 'The timestamp when the privacy policy was created',
    example: '2024-02-29T12:00:00Z'
  })
  @Column({ type: 'timestamp', nullable: false })
  dateOfCreation: Date;  // ✅ Now user can update this field

  @ApiProperty({
    description: 'The timestamp when the privacy policy was last updated',
    example: '2024-02-29T14:30:00Z'
  })
  @UpdateDateColumn()
  updatedAt: Date;
}

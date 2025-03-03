import { PartialType } from '@nestjs/mapped-types';
import { CreateCouponDto } from './create-coupon.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID, IsArray } from 'class-validator';

export class UpdateCouponDto extends PartialType(CreateCouponDto) {
    @ApiProperty({
        description: 'Array of product IDs this coupon applies to',
        example: ['123e4567-e89b-12d3-a456-426614174000', '223e4567-e89b-12d3-a456-426614174001'],
        required: false,
        type: [String]
    })
    @IsArray()
    @IsUUID('4', { each: true })
    @IsOptional()
    productIds?: string[];
}
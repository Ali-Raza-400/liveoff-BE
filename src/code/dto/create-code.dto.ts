import { IsString, IsOptional, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCodeDto {
    @ApiProperty({ example: "DISCOUNT2024", description: "Unique code string" })
    @IsString()
    code: string;

    @ApiProperty({ example: "Free shipping on orders above $50", required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: "shipping", required: false })
    @IsOptional()
    @IsString()
    type?: string;

    @ApiProperty({ example: "d290f1ee-6c54-4b01-90e6-d701748f0851", required: false, description: "Coupon ID (if applicable)" })
    @IsOptional()
    @IsString()  // Allow empty string
    @IsUUID()    // Validate UUID if provided
    couponId?: string;

    @ApiProperty({ example: "3fa85f64-5717-4562-b3fc-2c963f66afa6", required: false, description: "Store ID (if applicable)" })
    @IsOptional()
    @IsString()  
    @IsUUID()    
    storeId?: string;

    @ApiProperty({ example: "e4eaaaf2-d142-11e1-b3e4-080027620cdd", required: false, description: "Product ID (if applicable)" })
    @IsOptional()
    @IsString()  
    @IsUUID()    
    productId?: string;
}

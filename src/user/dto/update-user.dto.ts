import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsEnum, IsArray, ArrayMinSize, IsString, IsBoolean } from 'class-validator';
import { UserRole } from '../enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @ApiProperty({ enum: UserRole, required: false, example: UserRole.ADMIN })
    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;

    @ApiProperty({
        type: [String],
        required: false,
        example: ['read_dashboard', 'manage_users']
    })
    @IsOptional()
    @IsArray()
    @ArrayMinSize(1, { message: 'At least one permission should be provided' })
    @IsString({ each: true })
    permissions?: string[];

    @ApiProperty({ required: false, example: true })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}

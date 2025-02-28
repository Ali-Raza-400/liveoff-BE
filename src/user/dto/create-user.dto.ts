import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsEnum, IsOptional, ArrayNotEmpty } from 'class-validator';
import { UserRole } from '../enums/role.enum';

export class CreateUserDto {

    @ApiProperty({
        description: 'Full name of the user',
        example: 'John Doe',
        minLength: 3,
    })
    @IsString()
    @MinLength(3)
    name: string;

    @ApiProperty({
        description: 'Email address of the user (must be unique)',
        example: 'john.doe@example.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Password for the user (min length 6 characters)',
        example: 'P@ssw0rd123',
        minLength: 6,
    })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({
        description: 'Role assigned to the user (admin or user)',
        example: 'user',
        enum: UserRole,
    })
    @IsEnum(UserRole)
    role: UserRole;

    @ApiProperty({
        description: 'List of permissions granted to the user (optional)',
        example: ['read_dashboard', 'edit_profile'],
        required: false,
        type: [String],
    })
    @IsOptional()
    @ArrayNotEmpty({ message: 'Permissions array cannot be empty if provided' })
    permissions?: string[];
}

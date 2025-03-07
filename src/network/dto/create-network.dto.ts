import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateNetworkDto {
    @ApiProperty({ example: 'Retail Network', description: 'Name of the network' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'active', enum: ['active', 'inactive'], description: 'Status of the network' })
    @IsEnum(['active', 'inactive'])
    status: 'active' | 'inactive';
}

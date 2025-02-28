import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'john.doe@example.com', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'P@ssw0rd123', description: 'User password' })
  @IsString()
  password: string;
}

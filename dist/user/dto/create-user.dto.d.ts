import { UserRole } from '../enums/role.enum';
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    permissions?: string[];
}

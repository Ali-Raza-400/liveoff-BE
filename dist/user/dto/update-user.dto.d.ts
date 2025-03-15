import { CreateUserDto } from './create-user.dto';
import { UserRole } from '../enums/role.enum';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    role?: UserRole;
    permissions?: string[];
    isActive?: boolean;
}
export {};

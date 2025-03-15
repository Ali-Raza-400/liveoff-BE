import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<User>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        email: string;
        role: string;
        fullName: string;
        isActive: boolean;
        userId: string;
        user_permissions: string[];
    }>;
    logout(): Promise<{
        message: string;
    }>;
    getProfile(id: string, req: any): Promise<User>;
    findAll(): Promise<User[]>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
    getUserCount(): Promise<{
        count: number;
    }>;
}

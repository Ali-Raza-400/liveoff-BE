import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private userRepository;
    private readonly jwtService;
    private blacklist;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
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
    logout(): {
        message: string;
    };
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<{
        message: string;
    }>;
    getUserCount(): Promise<{
        count: number;
    }>;
}

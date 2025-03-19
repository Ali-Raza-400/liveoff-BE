import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ILike, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  private blacklist: Set<string> = new Set(); // Stores blacklisted tokens

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('A user with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({ where: { email: loginDto.email } });


    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      sub: user.id,          // This should be 'sub', not 'userId'
      email: user.email,
      role: user.role,

    };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken, email: user.email, role: user.role, fullName: user.name,
      isActive: user.isActive, userId: user.id, user_permissions: user.permissions,
    };
  }

  logout() {
    // Blacklist token (you should use a DB cache like Redis in production)
    return { message: 'User logged out successfully' };
  }

  async findAll(page: number = 1, limit: number = 10, search?: string) {
    const whereCondition = search
      ? [
        { name: ILike(`%${search}%`) }, // Case-insensitive search on name
        { email: ILike(`%${search}%`) }, // Case-insensitive search on email
      ]
      : {}; // If no search, return all users

    const [users, totalRecords] = await this.userRepository.findAndCount({
      where: whereCondition,
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPages = Math.ceil(totalRecords / limit);

    return {
      statusCode: 200, // Keep it 200 even if no users found
      message: users.length ? 'Users retrieved successfully' : 'No users found',
      data: users, // Return an empty array if no records are found
      metadata: {
        totalRecords,
        itemsPerPage: limit,
        currentPage: page,
        nextPage: page < totalPages ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null,
        totalPages,
      },
    };
  }

  async findOne(id: string) {
    console.log("id::::", id)
    const user = await this.userRepository.findOne({ where: { id } });
    console.log("user::::", user)
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await this.userRepository.delete(id);
    return { message: `User with id ${id} deleted successfully` };
  }

  async getUserCount() {
    const count = await this.userRepository.count();
    return { count };
  }
}

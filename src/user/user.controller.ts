import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { UserRole } from './enums/role.enum';
import { Roles } from 'src/custom-decorators/role_decorator';

@ApiTags('User Management')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully', type: User })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 409, description: 'A user with this email already exists' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login User' })
  @ApiResponse({ status: 200, description: 'Returns access token' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout User' })
  @ApiResponse({ status: 200, description: 'Successfully logged out' })
  async logout() {
    return this.userService.logout();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt')) // This applies the JWT strategy
  @ApiBearerAuth() // This tells Swagger UI to show Authorization input
  @ApiOperation({ summary: 'Get your own profile by ID (protected)' })
  @ApiResponse({ status: 200, description: 'Profile fetched successfully' })
  async getProfile(@Param('id') id: string, @Req() req: any) {
    console.log("req::::",req.user ,id)
    const user = req.user; // This comes from the decoded JWT token

    if (user.id !== id) {
      throw new UnauthorizedException('You can only access your own profile');
    }

    return this.userService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of all users', type: [User] })
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing user' })
  @ApiResponse({ status: 200, description: 'User updated successfully', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBody({ type: UpdateUserDto })  // 🔥 This makes sure the payload schema is shown in Swagger
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  
  @Delete(':id')
  @ApiBearerAuth() 
  @ApiOperation({ summary: 'Delete user by ID (admin only)' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Only admin can delete users' })
  @UseGuards(JwtAuthGuard, RolesGuard)  // Requires valid JWT + admin role check
  @Roles(UserRole.ADMIN)  // This is the custom role check
  async deleteUser(@Param('id') id: string) {
      return this.userService.remove(id);
  }
}

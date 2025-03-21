import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException, Req, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
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
import { UserQueryDto } from './dto/user-query.dto';

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
    console.log("req::::", req.user, id)
    const user = req.user; // This comes from the decoded JWT token

    if (user.id !== id) {
      throw new UnauthorizedException('You can only access your own profile');
    }

    return this.userService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users with optional search and pagination' })
  @ApiResponse({ status: 200, description: 'List of users with metadata' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'name', required: false, type: String, example: 'John' })
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(@Query() query: UserQueryDto) {
    return this.userService.findAll(query.page, query.limit, query.name);
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

  //get user count 
  @Get('stats/count')
  // @ApiBearerAuth() 
  @ApiOperation({ summary: 'Get user count' })
  @ApiResponse({ status: 200, description: 'User count fetched successfully' })
  async getUserCount() {
    return this.userService.getUserCount();
  }

}

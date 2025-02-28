import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,  // Make sure ConfigModule is imported so env vars are available
    PassportModule.register({ defaultStrategy: 'jwt' }), // This links to JwtStrategy
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'default_secret_key',
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy], // Add JwtStrategy to providers
  exports: [UserService, JwtStrategy], // Export JwtStrategy if needed elsewhere
})
export class UserModule {}

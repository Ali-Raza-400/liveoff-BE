import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
export declare const DatabaseProviders: (configService: ConfigService) => TypeOrmModuleOptions;

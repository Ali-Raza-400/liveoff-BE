import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseProviders } from './database.providers';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Inject ConfigService to read env
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => DatabaseProviders(configService),
    }),
  ],
})
export class DatabaseModule {}

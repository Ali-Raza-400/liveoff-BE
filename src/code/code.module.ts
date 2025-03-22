import { Module } from '@nestjs/common';
import { CodeService } from './code.service';
import { CodeController } from './code.controller';
import { Code } from './entities/code.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from 'src/store/entities/store.entity';
import { Coupon } from 'src/coupon/entities/coupon.entity';
import { Product } from 'src/product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Code,Store, Coupon, Product])],
  controllers: [CodeController],
  providers: [CodeService],
})
export class CodeModule {}

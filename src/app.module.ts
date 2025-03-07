import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { StoreModule } from './store/store.module';
import { ProductModule } from './product/product.module';
import { CouponModule } from './coupon/coupon.module';
import { NetworkModule } from './network/network.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [UserModule,DatabaseModule, ConfigModule.forRoot({ isGlobal: true }), StoreModule, ProductModule, CouponModule, NetworkModule, CategoryModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

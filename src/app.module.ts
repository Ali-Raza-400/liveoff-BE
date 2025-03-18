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
import { BlogModule } from './blogs/blogs.module';
import { EventsModule } from './events/events.module';
import { PrivacyPolicyModule } from './privacy-policy/privacy-policy.module';
import { TermsAndConditionModule } from './terms-and-condition/terms-and-condition.module';

@Module({
  imports: [UserModule,DatabaseModule, ConfigModule.forRoot({ isGlobal: true }), StoreModule, ProductModule, CouponModule, NetworkModule, CategoryModule, BlogModule, EventsModule, PrivacyPolicyModule, TermsAndConditionModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

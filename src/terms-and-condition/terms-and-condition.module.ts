import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TermsCondition } from './entities/terms-and-condition.entity';
import { TermsConditionController } from './terms-and-condition.controller';
import { TermsConditionService } from './terms-and-condition.service';

@Module({
  imports: [TypeOrmModule.forFeature([TermsCondition])],
  controllers: [TermsConditionController],
  providers: [TermsConditionService],
})
export class TermsAndConditionModule {}

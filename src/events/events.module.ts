import { Module } from '@nestjs/common';
import { EventService } from './events.service';
import { EventController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Store } from 'src/store/entities/store.entity';
import { Coupon } from 'src/coupon/entities/coupon.entity';

@Module({
   imports: [TypeOrmModule.forFeature([Event,Store,Coupon])],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventsModule {}

import { PartialType } from '@nestjs/swagger';
import { EventDto } from './create-event.dto';

export class UpdateEventDto extends PartialType(EventDto) {}

import { ApiProperty } from '@nestjs/swagger';
import { Store } from '../../store/entities/store.entity';

export class NetworkResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    status: 'active' | 'inactive';

    @ApiProperty({ type: [Store] })
    stores: Store[];

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}

import { Repository } from 'typeorm';
import { Network } from './entities/network.entity';
import { CreateNetworkDto } from './dto/create-network.dto';
import { UpdateNetworkDto } from './dto/update-network.dto';
export declare class NetworkService {
    private readonly networkRepo;
    constructor(networkRepo: Repository<Network>);
    create(dto: CreateNetworkDto): Promise<Network>;
    findAll(): Promise<Network[]>;
    findOne(id: string): Promise<Network>;
    update(id: string, dto: UpdateNetworkDto): Promise<Network>;
    remove(id: string): Promise<void>;
}

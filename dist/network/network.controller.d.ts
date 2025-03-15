import { NetworkService } from './network.service';
import { CreateNetworkDto } from './dto/create-network.dto';
import { UpdateNetworkDto } from './dto/update-network.dto';
import { NetworkResponseDto } from './dto/network-response.dto';
export declare class NetworkController {
    private readonly networkService;
    constructor(networkService: NetworkService);
    create(dto: CreateNetworkDto): Promise<NetworkResponseDto>;
    findAll(): Promise<NetworkResponseDto[]>;
    findOne(id: string): Promise<NetworkResponseDto>;
    update(id: string, dto: UpdateNetworkDto): Promise<NetworkResponseDto>;
    remove(id: string): Promise<void>;
}

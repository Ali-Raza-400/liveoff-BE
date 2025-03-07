import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Network } from './entities/network.entity';
import { CreateNetworkDto } from './dto/create-network.dto';
import { UpdateNetworkDto } from './dto/update-network.dto';

@Injectable()
export class NetworkService {
    constructor(
        @InjectRepository(Network)
        private readonly networkRepo: Repository<Network>,
    ) {}

    async create(dto: CreateNetworkDto): Promise<Network> {
        const network = this.networkRepo.create(dto);
        return await this.networkRepo.save(network);
    }

    async findAll(): Promise<Network[]> {
        return await this.networkRepo.find({ relations: ['stores'] });
    }

    async findOne(id: string): Promise<Network> {
        const network = await this.networkRepo.findOne({
            where: { id },
            relations: ['stores'],
        });

        if (!network) throw new NotFoundException('Network not found');
        return network;
    }

    async update(id: string, dto: UpdateNetworkDto): Promise<Network> {
        await this.findOne(id);  // Ensure network exists

        await this.networkRepo.update(id, dto);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        const result = await this.networkRepo.delete(id);
        if (result.affected === 0) throw new NotFoundException('Network not found');
    }
}

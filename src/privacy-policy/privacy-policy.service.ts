import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePrivacyPolicyDto } from './dto/create-privacy-policy.dto';
import { UpdatePrivacyPolicyDto } from './dto/update-privacy-policy.dto';
import { PrivacyPolicy } from './entities/privacy-policy.entity';

@Injectable()
export class PrivacyPolicyService {
  constructor(
    @InjectRepository(PrivacyPolicy)
    private privacyPolicyRepository: Repository<PrivacyPolicy>,
  ) {}

  create(createPrivacyPolicyDto: CreatePrivacyPolicyDto) {
    const privacyPolicy = this.privacyPolicyRepository.create({
      questions: createPrivacyPolicyDto.questions,
      dateOfCreation: new Date(createPrivacyPolicyDto.dateOfCreation), // ✅ Convert string to Date
    });
  
    return this.privacyPolicyRepository.save(privacyPolicy);
  }
  

  findAll() {
    return this.privacyPolicyRepository.find();
  }

  async findOne(id: string) {
    const privacyPolicy = await this.privacyPolicyRepository.findOne({
      where: { id },
    });

    if (!privacyPolicy) {
      throw new NotFoundException(`Privacy policy with ID "${id}" not found`);
    }

    return privacyPolicy;
  }

  async update(id: string, updatePrivacyPolicyDto: UpdatePrivacyPolicyDto) {
    const privacyPolicy = await this.findOne(id);
  
    Object.assign(privacyPolicy, {
      questions: updatePrivacyPolicyDto.questions ?? privacyPolicy.questions,
      dateOfCreation: updatePrivacyPolicyDto.dateOfCreation
        ? new Date(updatePrivacyPolicyDto.dateOfCreation)
        : privacyPolicy.dateOfCreation, // ✅ Only update if provided
    });
  
    return this.privacyPolicyRepository.save(privacyPolicy);
  }
  

  async remove(id: string) {
    const privacyPolicy = await this.findOne(id);
    return this.privacyPolicyRepository.remove(privacyPolicy);
  }
}

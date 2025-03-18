import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TermsCondition } from './entities/terms-and-condition.entity';
import { CreateTermsConditionDto } from './dto/create-terms-and-condition.dto';
import { UpdateTermsConditionDto } from './dto/update-terms-and-condition.dto';

@Injectable()
export class TermsConditionService {
  constructor(
    @InjectRepository(TermsCondition)
    private readonly termsConditionRepository: Repository<TermsCondition>,
  ) {}

  create(createTermsConditionDto: CreateTermsConditionDto) {
    const termsCondition = this.termsConditionRepository.create({
      sections: createTermsConditionDto.sections,
    });
    return this.termsConditionRepository.save(termsCondition);
  }

  findAll() {
    return this.termsConditionRepository.find();
  }

  async findOne(id: string) {
    const termsCondition = await this.termsConditionRepository.findOne({ where: { id } });
    if (!termsCondition) {
      throw new NotFoundException(`Terms and conditions with ID ${id} not found`);
    }
    return termsCondition;
  }

  async update(id: string, updateTermsConditionDto: UpdateTermsConditionDto) {
    const termsCondition = await this.findOne(id);
    Object.assign(termsCondition, updateTermsConditionDto);
    return this.termsConditionRepository.save(termsCondition);
  }

  async remove(id: string) {
    const termsCondition = await this.findOne(id);
    return this.termsConditionRepository.remove(termsCondition);
  }
}
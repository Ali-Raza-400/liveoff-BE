import { Test, TestingModule } from '@nestjs/testing';
import { TermsConditionController } from './terms-and-condition.controller';
import { TermsConditionService } from './terms-and-condition.service';

describe('TermsAndConditionController', () => {
  let controller: TermsConditionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TermsConditionController],
      providers: [TermsConditionService],
    }).compile();

    controller = module.get<TermsConditionController>(TermsConditionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

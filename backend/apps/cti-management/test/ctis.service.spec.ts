import { Test, TestingModule } from '@nestjs/testing';
import { CtisService } from './ctis.service';

describe('CtisService', () => {
  let service: CtisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CtisService],
    }).compile();

    service = module.get<CtisService>(CtisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

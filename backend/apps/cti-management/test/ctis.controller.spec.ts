import { Test, TestingModule } from '@nestjs/testing';
import { CtisController } from './ctis.controller';
import { CtisService } from './ctis.service';

describe('CtisController', () => {
  let controller: CtisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CtisController],
      providers: [CtisService],
    }).compile();

    controller = module.get<CtisController>(CtisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

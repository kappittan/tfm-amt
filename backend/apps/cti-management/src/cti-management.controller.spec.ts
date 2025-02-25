import { Test, TestingModule } from '@nestjs/testing';
import { CtiManagementController } from './cti-management.controller';
import { CtiManagementService } from './cti-management.service';

describe('CtiManagementController', () => {
  let ctiManagementController: CtiManagementController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CtiManagementController],
      providers: [CtiManagementService],
    }).compile();

    ctiManagementController = app.get<CtiManagementController>(CtiManagementController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(ctiManagementController.getHello()).toBe('Hello World!');
    });
  });
});

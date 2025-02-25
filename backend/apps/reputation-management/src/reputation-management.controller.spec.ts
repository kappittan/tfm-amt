import { Test, TestingModule } from '@nestjs/testing';
import { ReputationManagementController } from './reputation-management.controller';
import { ReputationManagementService } from './reputation-management.service';

describe('ReputationManagementController', () => {
  let reputationManagementController: ReputationManagementController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ReputationManagementController],
      providers: [ReputationManagementService],
    }).compile();

    reputationManagementController = app.get<ReputationManagementController>(ReputationManagementController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(reputationManagementController.getHello()).toBe('Hello World!');
    });
  });
});

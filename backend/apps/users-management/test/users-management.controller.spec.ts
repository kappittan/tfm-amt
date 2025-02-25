import { Test, TestingModule } from '@nestjs/testing';
import { UsersManagementController } from './users-management.controller';
import { UsersManagementService } from './users-management.service';

describe('UsersManagementController', () => {
  let usersManagementController: UsersManagementController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersManagementController],
      providers: [UsersManagementService],
    }).compile();

    usersManagementController = app.get<UsersManagementController>(UsersManagementController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(usersManagementController.getHello()).toBe('Hello World!');
    });
  });
});

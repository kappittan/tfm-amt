import { Module } from '@nestjs/common';
import { UsersManagementController } from './application/users-management.controller';
import { UsersManagementService } from './application/users-management.service';

@Module({
  imports: [],
  controllers: [UsersManagementController],
  providers: [UsersManagementService],
})
export class UsersManagementModule {}

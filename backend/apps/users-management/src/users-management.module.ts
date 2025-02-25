import { Module } from '@nestjs/common';
import { UsersManagementController } from './users-management.controller';
import { UsersManagementService } from './users-management.service';

@Module({
  imports: [],
  controllers: [UsersManagementController],
  providers: [UsersManagementService],
})
export class UsersManagementModule {}

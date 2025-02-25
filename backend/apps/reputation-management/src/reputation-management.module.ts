import { Module } from '@nestjs/common';
import { ReputationManagementController } from './reputation-management.controller';
import { ReputationManagementService } from './reputation-management.service';

@Module({
  imports: [],
  controllers: [ReputationManagementController],
  providers: [ReputationManagementService],
})
export class ReputationManagementModule {}

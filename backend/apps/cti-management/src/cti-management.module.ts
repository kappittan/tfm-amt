import { Module } from '@nestjs/common';
import { CtiManagementController } from './cti-management.controller';
import { CtiManagementService } from './cti-management.service';

@Module({
  imports: [],
  controllers: [CtiManagementController],
  providers: [CtiManagementService],
})
export class CtiManagementModule {}

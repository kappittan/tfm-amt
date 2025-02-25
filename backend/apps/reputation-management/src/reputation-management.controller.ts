import { Controller, Get } from '@nestjs/common';
import { ReputationManagementService } from './reputation-management.service';

@Controller()
export class ReputationManagementController {
  constructor(private readonly reputationManagementService: ReputationManagementService) {}

  @Get()
  getHello(): string {
    return this.reputationManagementService.getHello();
  }
}

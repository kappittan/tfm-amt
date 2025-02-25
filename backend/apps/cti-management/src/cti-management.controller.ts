import { Controller, Get } from '@nestjs/common';
import { CtiManagementService } from './cti-management.service';

@Controller()
export class CtiManagementController {
  constructor(private readonly ctiManagementService: CtiManagementService) {}

  @Get()
  getHello(): string {
    return this.ctiManagementService.getHello();
  }
}

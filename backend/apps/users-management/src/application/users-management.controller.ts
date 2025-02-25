import { Controller, Get } from '@nestjs/common';
import { UsersManagementService } from './users-management.service';

@Controller()
export class UsersManagementController {
  constructor(private readonly usersManagementService: UsersManagementService) {}

  @Get()
  getHello(): string {
    return this.usersManagementService.getHello();
  }
}

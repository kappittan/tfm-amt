/* eslint-disable no-unused-vars */
import { Controller, Get } from '@nestjs/common';
import { UsersManagementService } from './users-management.service';

@Controller('users')
// eslint-disable-next-line import/prefer-default-export
export class UsersManagementController {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly usersManagementService: UsersManagementService,
    // eslint-disable-next-line no-empty-function
  ) {}

  @Get()
  getOrganization() {
    const result = this.usersManagementService.getOrganization();

    if (result.isFailure) {
      return 'Error';
    }

    return result.getValue();
  }
}

import { Injectable } from '@nestjs/common';
import { Organization } from '../domain/Organization';
import { Result } from '@app/common-lib/core/logic/Result';

@Injectable()
// eslint-disable-next-line import/prefer-default-export
export class UsersManagementService {
  // eslint-disable-next-line class-methods-use-this
  getOrganization(): Result<Organization> {
    return Organization.create({
      name: 'OrganizationA',
      description: 'A organization to share CTI',
      reputation: 0,
      createdAt: new Date(),
    });
  }
}

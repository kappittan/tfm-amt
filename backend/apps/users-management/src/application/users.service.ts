import { Injectable } from '@nestjs/common';
import * as Domain from '../domain';
import { Result } from '@app/common-lib/core/logic/Result';
import { UserRepository } from '../repo/users.repository';

@Injectable()
// eslint-disable-next-line import/prefer-default-export
export class UsersService {
  constructor(private readonly organizationRepository: UserRepository) {}

  // eslint-disable-next-line class-methods-use-this
  createOrganization(organizationValues: {
    name: string;
    password: string;
    description: string;
  }): void {
    const result = Domain.Organization.create({
      name: organizationValues.name,
      password: organizationValues.password,
      description: organizationValues.description,
      reputation: 0,
      createdAt: new Date(),
    });

    if (result.isSuccess) {
      const newOrganization = result.getValue();
      this.organizationRepository.save(newOrganization);
    }
  }

  async getAllOrganizations(): Promise<Domain.Organization[]> {
    const orgs = await this.organizationRepository.findAll();

    return orgs;
  }
}

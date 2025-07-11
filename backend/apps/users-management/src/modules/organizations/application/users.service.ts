import { Injectable } from '@nestjs/common';
import * as Domain from '../domain';
import { Result } from '@app/common-lib/core/logic/Result';
import { UserRepository } from '../repo/users.repository';
import { Either, left, right } from '@app/common-lib/core/logic/Either';
import * as Exceptions from '../exceptions';
import { Role } from '@app/common-lib/auth/enum/role.enum';

@Injectable()
// eslint-disable-next-line import/prefer-default-export
export class UsersService {
  constructor(private readonly organizationRepository: UserRepository) {}

  // eslint-disable-next-line class-methods-use-this
  async createOrganization(organizationValues: {
    name: string;
    password: string;
    description: string;
  }): Promise<
    Either<Exceptions.PasswordIsNotValid, Result<Domain.Organization>>
  > {
    // Check if the password is valid
    const passwordOrError = await Domain.Password.create({
      value: organizationValues.password,
      hashed: false,
    });

    if (passwordOrError.isFailure) {
      return left(
        Exceptions.PasswordIsNotValid.create(passwordOrError.error.toString()),
      );
    }

    // Check if the organization name already exists
    const organizationExists = await this.organizationRepository.findByName(
      organizationValues.name,
    );

    if (organizationExists) {
      return left(
        Exceptions.OrganizationNameIsTaken.create(organizationValues.name),
      );
    }

    // Create the new organization
    const result = Domain.Organization.create({
      roles: [Role.User, Role.LowTrust],
      name: organizationValues.name,
      password: passwordOrError.getValue(),
      description: organizationValues.description,
      reputation: 0.5, // Default value
      createdAt: new Date(),
    });

    // Check if the organization creation process threw an error
    if (result.isFailure) {
      return left(
        Exceptions.OrganizationNotCreated.create(result.error.toString()),
      );
    }

    // Save the new organization
    const newOrganization = result.getValue();
    this.organizationRepository.save(newOrganization);

    // Return the new organization
    return right(Result.ok(newOrganization));
  }

  async getAllOrganizations(): Promise<Domain.Organization[]> {
    const orgs = await this.organizationRepository.findAll();
    const resolvedOrgs = await Promise.all(orgs);

    return resolvedOrgs;
  }

  async getReputationFromOrg(
    orgId: string,
  ): Promise<Either<Exceptions.OrganizationNotFound, Result<number>>> {
    const org = await this.organizationRepository.findById(orgId);

    if (org === null) {
      return left(Exceptions.OrganizationNotFound.create(orgId));
    }

    return right(Result.ok(org.reputation));
  }

  async getRoleFromOrg(
    orgId: string,
  ): Promise<Either<Exceptions.OrganizationNotFound, Result<string>>> {
    const org = await this.organizationRepository.findById(orgId);
    console.log('getRoleFromOrg');
    console.log(org);

    if (org === null) {
      return left(Exceptions.OrganizationNotFound.create(orgId));
    }

    console.log(org.roles);

    return right(Result.ok(org.roles[1]));
  }

  async updateOrganizationReputation(
    orgId: string,
    newReputation: number,
  ): Promise<Either<Exceptions.OrganizationNotFound, Result<void>>> {
    const org = await this.organizationRepository.findById(orgId);

    if (org === null) {
      return left(Exceptions.OrganizationNotFound.create(orgId));
    }

    org.updateReputation(newReputation);

    if (org.reputation >= 0.8) {
      org.roles = [Role.User, Role.HighTrust];
    } else if (org.reputation >= 0.6) {
      org.roles = [Role.User, Role.MediumTrust];
    } else {
      org.roles = [Role.User, Role.LowTrust];
    }

    await this.organizationRepository.save(org);

    return right(Result.ok());
  }

  async hello(orgId: string) {
    const org = await this.organizationRepository.findById(orgId);

    if (org === null) {
      return left(Exceptions.OrganizationNotFound.create(orgId));
    }

    if (org.reputation >= 0.8) {
      org.roles = [Role.User, Role.HighTrust];
    } else if (org.reputation >= 0.6) {
      org.roles = [Role.User, Role.MediumTrust];
      console.log(
        `Organization ${org.name} has Medium Trust role ${org.roles}`,
      );
    } else {
      org.roles = [Role.User, Role.LowTrust];
    }

    await this.organizationRepository.save(org);
  }

  async getOrganizationById(
    id: string,
  ): Promise<
    Either<Exceptions.OrganizationNotFound, Result<Domain.Organization>>
  > {
    const org = await this.organizationRepository.findById(id);

    if (org === null) {
      return left(Exceptions.OrganizationNotFound.create(id));
    }

    return right(Result.ok(org));
  }

  async getOrganizationByName(
    name: string,
  ): Promise<
    Either<Exceptions.OrganizationNotFound, Result<Domain.Organization>>
  > {
    const org = await this.organizationRepository.findByName(name);

    if (org === null) {
      return left(Exceptions.OrganizationNotFound.create(name)); // TODO Check this out
    }

    return right(Result.ok(org));
  }
}

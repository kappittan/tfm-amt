import { UniqueEntityID } from '@app/common-lib/core/domain/UniqueEntityID';
import * as Domain from '../domain';
import * as Persistence from '../infra/persistence';

export class OrganizationMapper {
  static async toDomain(
    raw: Persistence.Organization,
  ): Promise<Domain.Organization> {
    const password = await Domain.Password.create({
      value: raw.password,
      hashed: true,
    });
    const organization = Domain.Organization.create(
      {
        roles: raw.roles,
        name: raw.name,
        password: password.getValue(),
        description: raw.description,
        reputation: raw.reputation,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    );

    return organization.getValue();
  }

  static toPersistence(org: Domain.Organization): Persistence.Organization {
    return {
      id: org.id,
      roles: org.roles,
      name: org.name,
      password: org.password.value,
      description: org.description,
      reputation: org.reputation,
      createdAt: org.createdAt,
    };
  }
}

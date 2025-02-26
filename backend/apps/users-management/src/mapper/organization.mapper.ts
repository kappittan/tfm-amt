import { UniqueEntityID } from '@app/common-lib/core/domain/UniqueEntityID';
import * as Domain from '../domain';
import * as Persistence from '../infra/persistence';

export class OrganizationMapper {
  static toDomain(raw: Persistence.Organization): Domain.Organization {
    const organization = Domain.Organization.create(
      {
        name: raw.name,
        password: raw.password,
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
      name: org.name,
      password: org.password,
      description: org.description,
      reputation: org.reputation,
      createdAt: org.createdAt,
    };
  }
}

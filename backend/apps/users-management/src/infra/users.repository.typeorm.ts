import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repo/users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import * as Persistence from './persistence';
import * as Domain from '../domain';
import { Repository as TypeOrmRepository } from 'typeorm/repository/Repository';
import { OrganizationMapper } from '../mapper/organization.mapper';

@Injectable()
// eslint-disable-next-line import/prefer-default-export
export class OrganizationRepositoryTypeOrm extends UserRepository {
  constructor(
    @InjectRepository(Persistence.Organization)
    private readonly organizationRepository: TypeOrmRepository<Persistence.Organization>,
  ) {
    super();
  }

  save(entity: Domain.Organization): Promise<Domain.Organization> {
    return this.organizationRepository
      .save(OrganizationMapper.toPersistence(entity))
      .then((org) => OrganizationMapper.toDomain(org));
  }

  async findById(id: string): Promise<Domain.Organization> {
    const existsOrganization = await this.organizationRepository.findOneBy({
      id,
    });

    if (!!existsOrganization === true) {
      return OrganizationMapper.toDomain(existsOrganization);
    }

    return null;
  }

  async findByName(name: string): Promise<Domain.Organization> {
    const existsOrganization = await this.organizationRepository.findOneBy({
      name,
    });

    if (!!existsOrganization === true) {
      return OrganizationMapper.toDomain(existsOrganization);
    }

    return null;
  }

  async findAll(): Promise<Domain.Organization[]> {
    const organizations = await this.organizationRepository.find();

    return organizations.map((org) => OrganizationMapper.toDomain(org));
  }
}

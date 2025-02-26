import { Repository } from '@app/common-lib/core/repo/repository';
import * as Domain from '../domain';

export abstract class UserRepository extends Repository<Domain.Organization> {
  abstract findByName(name: string): Promise<Domain.Organization>;
  abstract findAll(): Promise<Domain.Organization[]>;
}

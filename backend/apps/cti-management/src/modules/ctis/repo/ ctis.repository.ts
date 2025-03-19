import { Repository } from '@app/common-lib/core/repo/repository';
import * as Domain from '../domain';

export abstract class CTIRepository extends Repository<Domain.CTI> {
  abstract findAll(): Promise<Domain.CTI[]>;
}

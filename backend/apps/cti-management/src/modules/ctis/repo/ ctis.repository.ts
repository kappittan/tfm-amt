import { Repository } from '@app/common-lib/core/repo/repository';
import * as Domain from '../domain';
import { FilterCtiDto } from '../dto/filter-cti.dto';

export abstract class CTIRepository extends Repository<Domain.CTI> {
  abstract findAll(
    filter: FilterCtiDto,
    role: string,
    orgId: string,
  ): Promise<Domain.CTI[]>;
}

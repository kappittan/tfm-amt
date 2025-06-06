import * as Persistence from '../infra/persistence';
import * as Domain from '../domain';
import { UniqueEntityID } from '@app/common-lib/core/domain/UniqueEntityID';
import { CTIDto } from '../dto/cti.dto';

export class CTIMapper {
  static toDomain(raw: Persistence.CTI): Domain.CTI {
    const cti = Domain.CTI.create(
      {
        name: raw.name,
        description: raw.description,
        owner: raw.owner,
        content: raw.content,
        qualityValue: raw.qualityValue,
        sharedAt: raw.sharedAt,
      },
      new UniqueEntityID(raw.id),
    );

    return cti.getValue();
  }

  static toPersistence(cti: Domain.CTI): Persistence.CTI {
    return {
      id: cti.id,
      name: cti.name,
      description: cti.description,
      owner: cti.owner,
      content: cti.content,
      qualityValue: cti.qualityValue,
      sharedAt: cti.sharedAt,
    };
  }

  static toDTO(cti: Domain.CTI): CTIDto {
    return {
      id: cti.id,
      name: cti.name,
      description: cti.description,
      owner: cti.owner,
      // content: cti.content,
      qualityValue: cti.qualityValue,
      sharedAt: cti.sharedAt,
    };
  }
}

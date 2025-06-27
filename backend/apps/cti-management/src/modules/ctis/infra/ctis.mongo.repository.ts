import { CTIRepository } from '../repo/ ctis.repository';
import * as Persistence from '../infra/persistence';
import * as Domain from '../domain';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CTIMapper } from '../mapper/cti.mapper';
import { FilterCtiDto } from '../dto/filter-cti.dto';

@Injectable()
export class CTIMongoRepository extends CTIRepository {
  constructor(
    @InjectModel(Persistence.CTI.name)
    private readonly ctiModel: Model<Persistence.CTI>,
  ) {
    super();
  }

  async findAll(filter?: FilterCtiDto): Promise<Domain.CTI[]> {
    const query: any = {};

    if (filter) {
      if (filter.fromQuality) {
        query.qualityValue = { $gte: filter.fromQuality };
      }
    }

    console.log(query);

    return this.ctiModel
      .find(query)
      .exec()
      .then((docs) => docs.map(CTIMapper.toDomain));
  }

  async save(cti: Domain.CTI): Promise<Domain.CTI> {
    // I tried findOneAndUpdate but it didn't work. It returned null
    return this.ctiModel
      .insertOne(CTIMapper.toPersistence(cti))
      .then(CTIMapper.toDomain);
  }

  async findById(id: string): Promise<Domain.CTI> {
    const result = this.ctiModel
      .findOne({ id })
      .exec()
      .then(CTIMapper.toDomain);

    if (!result) {
      return null;
    }

    return result;
  }
}

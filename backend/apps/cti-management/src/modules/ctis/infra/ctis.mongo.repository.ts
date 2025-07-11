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

  async findAll(
    filter: FilterCtiDto,
    role: string,
    orgId: string,
  ): Promise<Domain.CTI[]> {
    const query: any = {};

    switch (role) {
      case 'high-trust':
        query.qualityValue = { $gte: filter.fromQuality };
        break;
      case 'medium-trust':
        if (filter.fromQuality > 0.8) {
          query.qualityValue = { $lte: 0.8 };
        } else {
          query.qualityValue = {
            $gte: filter.fromQuality,
            $lte: 0.8,
          };
        }
        break;
      case 'low-trust':
        if (filter.fromQuality > 0.6) {
          query.qualityValue = { $lte: 0.6 };
        } else {
          query.qualityValue = {
            $gte: filter.fromQuality,
            $lte: 0.6,
          };
          break;
        }
        console.log(role);
        console.log(query);
    }

    const results = await this.ctiModel
      .find({
        $or: [{ qualityValue: query.qualityValue }, { owner: orgId }],
      })
      .exec();

    if (results === null) {
      return null;
    }

    return results.map((doc) => CTIMapper.toDomain(doc));
  }

  async save(cti: Domain.CTI): Promise<Domain.CTI> {
    // I tried findOneAndUpdate but it didn't work. It returned null
    return this.ctiModel
      .insertOne(CTIMapper.toPersistence(cti))
      .then(CTIMapper.toDomain);
  }

  async findById(id: string): Promise<Domain.CTI> {
    console.log(id);
    const result = await this.ctiModel.findOne({ id }).exec();

    if (result == null) {
      return null;
    }

    return CTIMapper.toDomain(result);
  }
}

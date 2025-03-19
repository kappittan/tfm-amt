import { Injectable } from '@nestjs/common';
import { CTIRepository } from '../repo/ ctis.repository';
import * as Domain from '../domain';

@Injectable()
export class CtisService {
  constructor(private readonly ctiRepository: CTIRepository) {}

  async getAllCTIs(): Promise<Domain.CTI[]> {
    return this.ctiRepository.findAll();
  }

  async getCTIById(id: string): Promise<Domain.CTI> {
    return this.ctiRepository.findById(id);
  }

  async uploadCTI(
    name: string,
    description: string,
    content: string,
    owner: string,
  ): Promise<Domain.CTI> {
    const cti = Domain.CTI.create({
      name,
      description,
      content,
      owner: 'test',
      qualityValue: 0,
      sharedAt: new Date(),
    });

    return this.ctiRepository.save(cti.getValue());
  }
}

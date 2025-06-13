import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CTIRepository } from '../repo/ ctis.repository';
import * as Domain from '../domain';
import * as Exception from '../exceptions';
import axios from 'axios';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { Either, left, right } from '@app/common-lib/core/logic/Either';
import { Result } from '@app/common-lib/core/logic/Result';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

interface CTIAssessmentResponse {
  interoperability: number;
  completeness: number;
  verifiability: number;
  consistency: number;
}

@Injectable()
export class CtisService {
  constructor(
    private readonly ctiRepository: CTIRepository,
    @Inject('USER_SERVICE') private client: ClientProxy,
  ) {}

  async getAllCTIs(): Promise<Domain.CTI[]> {
    return await this.ctiRepository.findAll();
  }

  async getCTIById(
    id: string,
  ): Promise<Either<Exception.CTINotFound, Domain.CTI>> {
    const result = await this.ctiRepository.findById(id);

    if (!result) {
      return left(Exception.CTINotFound.create(id));
    }

    return right(result);
  }

  async uploadCTI(
    name: string,
    description: string,
    content: string,
    owner: string,
  ): Promise<
    Either<
      | Exception.CTIAssessmentModuleError
      | Exception.InvalidSTIXFormat
      | Exception.OrganizationNotFound,
      Result<Domain.CTI>
    >
  > {
    try {
      // 1. Assess the quality of the CTI
      // 1.1. Make a request to the CTI assessment service
      const response = await axios.get<CTIAssessmentResponse>(
        'http://localhost:4000/assess',
      );
      const data = response.data;

      // 1.2. Calculate the quality value based on the assessment response
      const qualityValue =
        0.1 * data.interoperability +
        0.2 * data.completeness +
        0.3 * data.verifiability +
        0.4 * data.consistency;

      // 2. Update the reputation of the organization
      const previousReputation = await this.getOrganizationReputation(owner);

      if (previousReputation < 0) {
        return left(Exception.OrganizationNotFound.create(owner));
      }

      const newReputation = this.getReputationFromQualityValue(
        previousReputation,
        qualityValue,
      );

      const update = await this.updateOrganizationReputation(
        owner,
        newReputation,
      );

      if (update === 'ERROR') {
        return left(Exception.OrganizationNotFound.create(owner));
      }

      // 3. Create a new CTI instance
      const cti = Domain.CTI.create({
        name,
        description,
        content,
        owner,
        qualityValue,
        sharedAt: new Date(),
      });

      // 4. Save the CTI to the repository and return it
      const newCti = await this.ctiRepository.save(cti.getValue());
      return right(Result.ok(newCti));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { status, data } = error.response;

        switch (status) {
          case 400:
            return left(Exception.InvalidSTIXFormat.create());

          default:
            return left(Exception.CTIAssessmentModuleError.create());
        }
      }
    }
  }

  async getOrganizationReputation(orgId: string) {
    const pattern = { cmd: 'get_reputation' };
    const payload = orgId;

    return await firstValueFrom(this.client.send(pattern, payload));
  }

  async updateOrganizationReputation(orgId: string, newReputation: number) {
    const pattern = { cmd: 'update_reputation' };
    const payload = { orgId, newReputation };

    return await firstValueFrom(this.client.send(pattern, payload));
  }

  private getReputationFromQualityValue(
    previousReputation: number,
    qualityValue: number,
  ) {
    // 0. Define constants for lambda and beta
    const lambda = 0.1;
    const beta = 2;

    // 1. Calculate the alpha value based on the quality value
    const alpha = Math.tanh(
      (qualityValue >= 0.5 ? 2 : 5) * (qualityValue - 0.5),
    );

    // 2. Update the reputation based on the alpha value
    if (alpha >= 0) {
      return previousReputation + lambda * alpha * (1 - previousReputation);
    } else {
      return previousReputation + lambda * beta * alpha * previousReputation;
    }
  }
}

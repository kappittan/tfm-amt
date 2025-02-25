import { Injectable } from '@nestjs/common';

@Injectable()
export class ReputationManagementService {
  getHello(): string {
    return 'Hello World!';
  }
}

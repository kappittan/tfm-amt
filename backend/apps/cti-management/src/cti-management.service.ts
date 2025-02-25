import { Injectable } from '@nestjs/common';

@Injectable()
export class CtiManagementService {
  getHello(): string {
    return 'Hello World!';
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersManagementService {
  getHello(): string {
    return 'Hello World!';
  }
}

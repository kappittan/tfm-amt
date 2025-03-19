import { Module } from '@nestjs/common';
import { CommonLibService } from './common-lib.service';
import { AuthModule } from '../../../apps/users-management/src/modules/auth/auth.module';

@Module({
  providers: [CommonLibService],
  exports: [CommonLibService],
  imports: [AuthModule],
})
export class CommonLibModule {}

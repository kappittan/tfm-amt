import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CtisModule } from './src/modules/ctis/ctis.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@app/common-lib/auth/auth.guard';
import { RolesGuard } from '@app/common-lib/auth/roles.guard';
import { AuthModule } from 'apps/users-management/src/modules/auth/auth.module';
import { UsersModule } from 'apps/users-management/src/modules/organizations/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:example@localhost:27017/cti-management?authSource=admin&directConnection=true',
    ),
    CtisModule,
  ],
})
export class CtiManagementModule {}

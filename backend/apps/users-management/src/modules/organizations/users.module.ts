import { Module } from '@nestjs/common';
import { UsersController } from './application/users.controller';
import { UsersService } from './application/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Persistence from './infra/persistence';
import { UserRepository } from './repo/users.repository';
import { OrganizationRepositoryTypeOrm } from './infra/users.repository.typeorm';
import { AuthGuard } from '@app/common-lib/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([Persistence.Organization])],
  controllers: [UsersController],
  providers: [
    {
      provide: UserRepository,
      useClass: OrganizationRepositoryTypeOrm,
    },
    UsersService,
  ],
  exports: [UsersService],
})
// eslint-disable-next-line import/prefer-default-export
export class UsersModule {}

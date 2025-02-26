import { Module } from '@nestjs/common';
import { UsersController } from './application/users.controller';
import { UsersService } from './application/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Persistence from './infra/persistence';
import { UserRepository } from './repo/users.repository';
import { OrganizationRepositoryTypeOrm } from './infra/users.repository.typeorm';

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
})
// eslint-disable-next-line import/prefer-default-export
export class UsersModule {}

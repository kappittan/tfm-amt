import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CtisService } from './application/ctis.service';
import { CtisController } from './application/ctis.controller';
import { CTISchema } from './infra/persistence/CTI';
import { CTIRepository } from './repo/ ctis.repository';
import { CTIMongoRepository } from './infra/ctis.mongo.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersManagementModule } from 'apps/users-management/users-management.module';
import { ctisEnv } from './config/envs';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          port: ctisEnv.usersPort,
          host: ctisEnv.usersHost,
        },
      },
    ]),
    MongooseModule.forFeature([{ name: 'CTI', schema: CTISchema }]),
    UsersManagementModule,
  ],
  controllers: [CtisController],
  providers: [
    {
      provide: CTIRepository,
      useClass: CTIMongoRepository,
    },
    CtisService,
  ],
})
export class CtisModule {}

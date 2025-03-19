import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CtisService } from './application/ctis.service';
import { CtisController } from './application/ctis.controller';
import { CTISchema } from './infra/persistence/CTI';
import { CTIRepository } from './repo/ ctis.repository';
import { CTIMongoRepository } from './infra/ctis.mongo.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'CTI', schema: CTISchema }])],
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

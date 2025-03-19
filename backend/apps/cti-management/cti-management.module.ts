import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CtisModule } from './src/modules/ctis/ctis.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:example@localhost:27017/cti-management?authSource=admin&directConnection=true',
    ),
    CtisModule,
  ],
})
export class CtiManagementModule {}

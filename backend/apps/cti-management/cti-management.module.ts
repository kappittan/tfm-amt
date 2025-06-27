import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CtisModule } from './src/modules/ctis/ctis.module';
import { ctisEnv } from './src/modules/ctis/config/envs';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${ctisEnv.mongoUser}:${ctisEnv.mongoPass}@${ctisEnv.mongoHost}:${ctisEnv.mongoPort}/${ctisEnv.mongoDatabase}?authSource=admin`,
    ),
    CtisModule,
  ],
})
export class CtiManagementModule {}

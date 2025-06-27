import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './src/modules/organizations/users.module';
import { AuthModule } from './src/modules/auth/auth.module';
import { orgsEnv } from './src/modules/organizations/config/envs';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: orgsEnv.postgresHost,
      port: orgsEnv.postgresPort,
      username: orgsEnv.postgresUser,
      password: orgsEnv.postgresPass,
      database: orgsEnv.postgresDatabase,
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
    }),
    UsersModule,
    AuthModule,
  ],
  exports: [UsersModule, AuthModule],
})
export class UsersManagementModule {}

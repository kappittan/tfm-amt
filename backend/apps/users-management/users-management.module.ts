import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './src/modules/organizations/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@app/common-lib/auth/auth.guard';
import { AuthModule } from './src/modules/auth/auth.module';
import { RolesGuard } from '@app/common-lib/auth/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'test',
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

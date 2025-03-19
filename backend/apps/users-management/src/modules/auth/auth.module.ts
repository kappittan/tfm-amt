import { Module } from '@nestjs/common';
import { AuthController } from './application/auth.controller';
import { AuthService } from './application/auth.service';
import { UsersModule } from '../organizations/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant/constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@app/common-lib/auth/auth.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

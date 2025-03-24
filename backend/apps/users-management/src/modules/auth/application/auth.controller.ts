import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from '../dto/sign-in.dto';
import { Public } from '@app/common-lib/auth/decorator/public.decorator';
import { Response } from 'express';
import * as AuthModuleException from '../exceptions';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    const result = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case AuthModuleException.UserNotFound:
          res.status(HttpStatus.NOT_FOUND);
          res.json({ errors: { message: result.value.errorValue().message } });
          res.send();
          return;
        case AuthModuleException.UnauthorizedUser:
          res.status(HttpStatus.UNAUTHORIZED);
          res.json({ errors: { message: result.value.errorValue().message } });
          res.send();
          return;
        default:
          res.status(HttpStatus.INTERNAL_SERVER_ERROR);
          res.json({ errors: { message: 'Internal server error' } });
          res.send();
          return;
      }
    }

    res.status(HttpStatus.OK);
    res.json(result.value);
    res.end();
  }
}

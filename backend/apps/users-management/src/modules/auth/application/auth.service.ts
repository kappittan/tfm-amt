import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../organizations/application/users.service';
import { Password } from '../../organizations/domain';
import { JwtService } from '@nestjs/jwt';
import { Either, left, right } from '@app/common-lib/core/logic/Either';
import * as AuthModuleException from '../exceptions';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<
    Either<
      AuthModuleException.UnauthorizedUser | AuthModuleException.UserNotFound,
      { access_token: string; user_id: string; username: string }
    >
  > {
    const result = await this.usersService.getOrganizationByName(username);

    if (result.isLeft()) {
      return left(AuthModuleException.UserNotFound.create(username));
    }

    const organization = result.value.getValue();
    //const hashedPassword = await Password.hashPassword(pass);

    if (!bcrypt.compareSync(pass, organization.password.value)) {
      return left(AuthModuleException.UnauthorizedUser.create());
    }

    const payload = {
      sub: organization.id,
      username: organization.name,
      roles: organization.roles,
    };
    return right({
      access_token: await this.jwtService.signAsync(payload),
      user_id: organization.id,
      username: organization.name,
    });
  }
}

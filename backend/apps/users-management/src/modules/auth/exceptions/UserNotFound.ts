import { Exception } from '../../../../../../libs/common-lib/src/core/exceptions/Exception';

export class UserNotFound extends Exception {
  private constructor(userName: string) {
    super(`User with username "${userName}" not found`);
  }

  public static create(userName: string): UserNotFound {
    return new UserNotFound(userName);
  }
}

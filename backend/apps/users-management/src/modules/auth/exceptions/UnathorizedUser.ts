import { Exception } from '../../../../../../libs/common-lib/src/core/exceptions/Exception';

export class UnauthorizedUser extends Exception {
  private constructor() {
    super('Authentication is required');
  }

  public static create(): UnauthorizedUser {
    return new UnauthorizedUser();
  }
}

import { Exception } from '../../../../../../libs/common-lib/src/core/exceptions/Exception';

export class OrganizationNotFound extends Exception {
  private constructor(id: string) {
    super(`The organization with id "${id}" does not exist`);
  }

  public static create(id: string): OrganizationNotFound {
    return new OrganizationNotFound(id);
  }
}

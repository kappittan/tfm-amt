import { Exception } from '../../../../../../libs/common-lib/src/core/exceptions/Exception';

export class OrganizationNameIsTaken extends Exception {
  private constructor(name: string) {
    super(`The name "${name}" for the new organization is already taken`);
  }

  public static create(name: string): OrganizationNameIsTaken {
    return new OrganizationNameIsTaken(name);
  }
}

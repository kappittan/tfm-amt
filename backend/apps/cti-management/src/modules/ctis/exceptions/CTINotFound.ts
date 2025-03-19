import { Exception } from '../../../../../../libs/common-lib/src/core/exceptions/Exception';

export class CTINotFound extends Exception {
  private constructor(id: string) {
    super(`The CTI with id "${id}" does not exist`);
  }

  public static create(id: string): CTINotFound {
    return new CTINotFound(id);
  }
}

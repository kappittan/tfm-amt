import { Exception } from '../../../../../../libs/common-lib/src/core/exceptions/Exception';

export class InvalidSTIXFormat extends Exception {
  private constructor() {
    super('The STIX format is invalid');
  }

  public static create(): InvalidSTIXFormat {
    return new InvalidSTIXFormat();
  }
}

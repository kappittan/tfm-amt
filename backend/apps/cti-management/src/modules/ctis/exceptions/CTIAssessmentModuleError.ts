import { Exception } from '../../../../../../libs/common-lib/src/core/exceptions/Exception';

export class CTIAssessmentModuleError extends Exception {
  private constructor() {
    super('An error occurred in the CTI assessment module');
  }

  public static create(): CTIAssessmentModuleError {
    return new CTIAssessmentModuleError();
  }
}

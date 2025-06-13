import { Exception } from '../../../../../../libs/common-lib/src/core/exceptions/Exception';

export class CTIAssessmentModuleError extends Exception {
  private constructor() {
    super(
      'An error occurred in the CTI assessment module. Verify that the CTI complies with the established restrictions.',
    );
  }

  public static create(): CTIAssessmentModuleError {
    return new CTIAssessmentModuleError();
  }
}

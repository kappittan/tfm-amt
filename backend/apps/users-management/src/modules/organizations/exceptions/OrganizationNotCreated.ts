import { DomainError } from '@app/common-lib/core/exceptions/domain-error';
import { Exception } from '../../../../../../libs/common-lib/src/core/exceptions/Exception';

export class OrganizationNotCreated extends Exception {
  private constructor(message: string) {
    super(message);
  }

  public static create(message: string): OrganizationNotCreated {
    return new OrganizationNotCreated(message);
  }
}

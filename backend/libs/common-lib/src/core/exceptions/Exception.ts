import { DomainError } from '@app/common-lib/core/exceptions/domain-error';
import { Result } from '@app/common-lib/core/logic/Result';

export abstract class Exception extends Result<DomainError> {
  constructor(message: string) {
    super(false, {
      message,
    });
  }
}

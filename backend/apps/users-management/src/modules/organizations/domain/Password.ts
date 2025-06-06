import { ValueObject } from '@app/common-lib/core/domain/ValueObject';
import { Result } from '@app/common-lib/core/logic/Result';
import * as bcrypt from 'bcrypt';

interface PasswordProps {
  value: string;
  hashed: boolean;
}

export class Password extends ValueObject<PasswordProps> {
  private constructor(props: PasswordProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  get hashed(): boolean {
    return this.props.hashed;
  }

  public isHashed(): boolean {
    return this.props.hashed;
  }

  public static async hashPassword(password): Promise<string> {
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  public static isSecure(value: string): boolean {
    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(value);
  }

  public static async create(props: PasswordProps): Promise<Result<Password>> {
    if (
      props.value === undefined ||
      props.hashed === undefined ||
      props.value === null ||
      props.hashed === null
    ) {
      return Result.fail<Password>('Password cannot be null or undefined');
    }

    if (!props.hashed) {
      if (!this.isSecure(props.value)) {
        return Result.fail<Password>(
          'The password is not secure. It must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).',
        );
      }

      const hashedPassword = await this.hashPassword(props.value);

      return Result.ok<Password>(
        new Password({ value: hashedPassword, hashed: true }),
      );
    }

    return Result.ok<Password>(
      new Password({ value: props.value, hashed: true }),
    );
  }
}

import { Entity, UniqueEntityID } from '@app/common-lib/core/domain/Entity';
import { Result } from '@app/common-lib/core/logic/Result';
import { Password } from './Password';
import { Role } from '@app/common-lib/auth/enum/role.enum';

interface OrganizationProps {
  roles: Role[];
  name: string;
  password: Password;
  description: string;
  reputation: number;
  createdAt: Date;
}

// eslint-disable-next-line import/prefer-default-export
export class Organization extends Entity<OrganizationProps> {
  // eslint-disable-next-line no-useless-constructor
  private constructor(props: OrganizationProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): string {
    return this._id.toString();
  }

  get roles(): Role[] {
    return this.props.roles;
  }

  set roles(value: Role[]) {
    this.props.roles = value;
  }

  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  get password(): Password {
    return this.props.password;
  }

  set password(value: Password) {
    this.props.password = value;
  }

  get description(): string {
    return this.props.description;
  }

  set description(value: string) {
    this.props.description = value;
  }

  get reputation(): number {
    return this.props.reputation;
  }

  set reputation(value: number) {
    this.props.reputation = value;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  set createdAt(value: Date) {
    this.props.createdAt = value;
  }

  public updateReputation(newReputation: number) {
    this.props.reputation = newReputation;
  }

  public static create(
    props: OrganizationProps,
    id?: UniqueEntityID,
  ): Result<Organization> {
    const organization = new Organization(props, id);

    return Result.ok(organization);
  }
}

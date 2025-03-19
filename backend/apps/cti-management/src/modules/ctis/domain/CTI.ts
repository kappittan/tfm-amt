import { Entity, UniqueEntityID } from '@app/common-lib/core/domain/Entity';
import { Result } from '@app/common-lib/core/logic/Result';

interface CTIProps {
  name: string;
  description: string;
  content: string;
  owner: string;
  qualityValue: number;
  sharedAt: Date;
}

// eslint-disable-next-line import/prefer-default-export
export class CTI extends Entity<CTIProps> {
  // eslint-disable-next-line no-useless-constructor
  private constructor(props: CTIProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): string {
    return this._id.toString();
  }

  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  get description(): string {
    return this.props.description;
  }

  set description(value: string) {
    this.props.description = value;
  }

  get content(): string {
    return this.props.content;
  }

  set content(value: string) {
    this.props.content = value;
  }

  get owner(): string {
    return this.props.owner;
  }

  set owner(value: string) {
    this.props.owner = value;
  }

  get qualityValue(): number {
    return this.props.qualityValue;
  }

  set qualityValue(value: number) {
    this.props.qualityValue = value;
  }

  get sharedAt(): Date {
    return this.props.sharedAt;
  }

  set sharedAt(value: Date) {
    this.props.sharedAt = value;
  }

  public static create(props: CTIProps, id?: UniqueEntityID): Result<CTI> {
    const cti = new CTI(props, id);

    return Result.ok(cti);
  }
}

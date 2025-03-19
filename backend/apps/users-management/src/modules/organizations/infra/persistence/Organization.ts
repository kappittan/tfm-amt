import { Role } from '@app/common-lib/auth/enum/role.enum';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Organization {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    type: 'simple-array',
    default: [Role.User],
  })
  roles: Role[];

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  description: string;

  @Column()
  reputation: number;

  @Column()
  createdAt: Date;
}

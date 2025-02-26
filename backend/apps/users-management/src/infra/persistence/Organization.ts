import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Organization {
  @PrimaryColumn('uuid')
  id: string;

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

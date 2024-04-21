import { Base } from '@common/base.entity';
import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';

export enum UserStatus {
  active = 0,
  pending_email_activation = 1,
}

@Entity()
export class User extends Base {
  @Column({ type: 'varchar', length: 50 })
  firstName: string;

  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  @Column({ type: 'varchar', unique: true, length: 100 })
  email: string;

  @Exclude()
  @Column({
    type: 'varchar',
    length: 100,
    select: false,
  })
  passwordHash: string;

  @Exclude()
  @Column({ type: 'varchar', length: 100, select: false })
  salt: string;

  @Exclude()
  @Column({ type: 'smallint' })
  status: UserStatus;

  @Exclude()
  @Column({
    type: 'text',
    nullable: true,
    select: false,
  })
  refreshToken: string;

  @Exclude()
  @Column({
    type: 'text',
    nullable: true,
    select: false,
  })
  accessToken: string;

  constructor(values: Partial<User>) {
    super(values);
    Object.assign(this, values);
  }
}

import { Base } from '@common/base.entity';
import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';

export enum UserStatus {
  active = 0,
  pending_email_activation = 1,
}

@Entity({ name: 'users' })
export class User extends Base {
  @Column({ name: 'first_name', type: 'varchar', length: 50 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 50 })
  lastName: string;

  @Column({ name: 'email', type: 'varchar', unique: true, length: 100 })
  email: string;

  @Exclude()
  @Column({
    name: 'password_hash',
    type: 'varchar',
    length: 100,
    select: false,
  })
  passwordHash: string;

  @Exclude()
  @Column({ name: 'salt', type: 'varchar', length: 100, select: false })
  salt: string;

  @Exclude()
  @Column({ name: 'status', type: 'smallint' })
  status: UserStatus;

  @Exclude()
  @Column({
    name: 'refresh_token',
    type: 'text',
    nullable: true,
    select: false,
  })
  refreshToken: string;

  @Exclude()
  @Column({
    name: 'access_token',
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

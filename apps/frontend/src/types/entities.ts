export abstract class Base {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(values: Partial<Base>) {
    Object.assign(this, values);
  }
}

export enum UserStatus {
  active = 0,
  pending_email_activation = 1,
}

export class User extends Base {
  firstName: string;
  lastName: string;
  email: string;
  status: UserStatus;
  refreshToken?: string;
  accessToken?: string;

  constructor(values: Partial<User>) {
    super(values);
    Object.assign(this, values);
  }
}

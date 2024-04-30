import { Base } from "../base.entity";
import { UserStatus } from "./user-status.enum";

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

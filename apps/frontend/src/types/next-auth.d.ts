import { User as _User } from "@/types/schemas/user";

declare module "next-auth" {
  type Session<U extends User = User> = {
    accessToken: string;
    refreshToken: string;
    user: U;
  };

  type User = _User;
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  type JWT<U extends _User = _User> = {
    accessToken: string;
    refreshToken: string;
    user: U;
  };
}

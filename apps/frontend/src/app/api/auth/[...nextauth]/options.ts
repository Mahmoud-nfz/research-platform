import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { fetcher } from "@/utils/fetcher";
import { endpoints } from "@/constants";
import { LoginResponse } from "@/types";
import { User } from "@/types/entities";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jhon.doe@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        /**
         * This function is used to define if the user is authenticated or not.
         * If authenticated, the function should return an object contains the user data.
         * If not, the function should return `null`.
         */
        if (credentials == null) return null;

        /**
         * credentials are defined in the config above.
         * We can expect it contains three properties: `email` and `password`.
         */

        /* login user */
        const { data: tokens } = await fetcher<LoginResponse>(endpoints.login, {
          method: "POST",
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
          token: "",
        });

        const { data: user } = await fetcher<User | null>(endpoints.profile, {
          token: tokens.accessToken,
          method: "GET",
        });
        return { user, ...tokens };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { fetcher } from "@/utils/fetcher";
import { endpoints } from "@/constants";
import { LoginResponse } from "@/types";
import { User } from "@/types/entities";
import { z } from "zod";

const updateSessionSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  user: z.object({
    phoneNumber: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    position: z.string(),
    companyName: z.string(),
  }),
});

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
  callbacks: {
    session: async ({ session, token }) => {
      Object.assign(session, token);
      return session;
    },
    jwt: async ({ token, user, account, trigger, session }) => {
      if (trigger === "signIn") {
        if (account && account.provider === "credentials") {
          // get user from authorize callback
          Object.assign(token, user);
        }
      }

      if (trigger === "update") {
        // these updates come from the frontend. Extra checks must take place before authorizing these changes.
        try {
          const changes = await updateSessionSchema.parse(session);
          Object.assign(token, changes);
        } catch {
          // TODO: log changes do not conform to the schema of session update
        }
      }

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
};

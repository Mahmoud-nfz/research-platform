"use client";

import { useMutation } from "@tanstack/react-query";
import { signIn, SignInOptions } from "next-auth/react";

type SignInData = {
  email: string;
  password: string;
} & SignInOptions;

export default function useLogin() {
  return useMutation({
    mutationFn: async (data: SignInData) => {
      return signIn("credentials", data).then((response) => {
        if (!response?.ok) {
          throw new Error(
            response?.error ?? "An error occurred. Please try again"
          );
        }
        return response;
      });
    },
  });
}

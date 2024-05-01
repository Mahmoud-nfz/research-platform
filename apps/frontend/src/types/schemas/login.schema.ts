import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Adresse email invalide" }),
  password: z.string().min(6, {
    message: "Mot de passe doit contenir au moins 6 caractères",
  }),
});

export type LoginSchema = z.infer<typeof loginSchema>;


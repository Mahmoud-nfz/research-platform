import { z } from "zod";

export const createDataCollectionSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Le nom doit contenir au moins 4 caractères" }),
  imageUrl: z.string().url({ message: "L'image doit être un URL valide" }),
  description: z.string().min(10, {
    message: "La description doit contenir au moins 10 charactères",
  }),
  tags: z.array(z.string()),
  projectId: z.string().uuid({
    message: "Vous devez choisir un projet auquel associer cette collection",
  }),
});

export type CreateDataCollectionSchema = z.infer<
  typeof createDataCollectionSchema
>;

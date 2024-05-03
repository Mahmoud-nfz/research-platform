import { z } from 'zod';

export const createProjectSchema = z.object({
	name: z
		.string()
		.min(4, { message: 'Le nom doit contenir au moins 4 caractères' }),
	imageUrl: z.string().url({ message: "L'image doit être un URL valide" }),
	description: z.string().min(10, {
		message: 'La description doit contenir au moins 10 charactères',
	}),
	tags: z.array(z.string()),
});

export type CreateProjectSchema = z.infer<typeof createProjectSchema>;

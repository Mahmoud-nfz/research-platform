import { z } from 'zod';

export const uploadSchema = z.object({
	files: z.any().refine((files) => files?.length >= 1, {
		message: 'Sélectionnez un fichier svp',
	}),
	parentFolder: z.string().nullish(),
	description: z.string().nullish(),
	tags: z.array(z.string()).nullish(),
	selectedFileType: z.string().nullish(),
	path: z.string().nullish(),
});

export type UploadSchema = z.infer<typeof uploadSchema>;

import { z } from 'zod';

export const uploadSchema = z.object({
	files:
		typeof window === 'undefined'
			? z.custom<FileList>()
			: z
					.instanceof(FileList)
					.optional()
					.refine((filelist) => filelist?.length === 1),
	tags: z.array(z.string()).nullish(),
	selectedFileType: z.string().nullish(),
	path: z.string(),
	name: z.string(),
});

export type UploadSchema = z.infer<typeof uploadSchema>;

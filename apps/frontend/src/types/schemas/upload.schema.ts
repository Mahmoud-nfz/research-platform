import { z } from "zod";

export const uploadSchema = z.object({
	files: z.any().refine((files) => files?.length >= 1, {message: 'Please select a file'}),
	parentFolder: z.string().optional(),
});

export type UploadSchema = z.infer<typeof uploadSchema>;

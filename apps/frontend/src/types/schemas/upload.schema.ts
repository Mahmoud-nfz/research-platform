import path from "path";
import { z } from "zod";

export const uploadSchema = z.object({
	files: z.any().refine((files) => files?.length >= 1, {message: 'Please select a file'}),
	parentFolder: z.string().optional(),
	description : z.string().optional(),
	tags : z.array(z.string()).optional(),
	selectedFileType: z.string().optional(),
	path : z.string().optional(),

});

export type UploadSchema = z.infer<typeof uploadSchema>;

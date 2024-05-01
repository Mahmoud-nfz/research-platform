import { z } from "zod";

export const uploadSchema = z.object({
	files: z.any(),
	parentFolder: z.string().optional(),
});

export type UploadSchema = z.infer<typeof uploadSchema>;

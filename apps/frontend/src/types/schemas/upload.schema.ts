import path from "path";
import { z } from "zod";

export const uploadSchema = z.object({
	files: z.any().refine((files) => files?.length >= 1, {message: 'Please select a file'}),
	parentFolder: z.any().optional(),
	description : z.any().optional(),
	tags : z.array(z.any()).optional(),
	selectedFileType: z.any().optional(),
	path : z.any().optional(),

});
const FileType = {
	Model: 'Model',
	RawData: 'Raw Data',
	PreprocessedData: 'Preprocessed Data'
  };

export type UploadSchema = z.infer<typeof uploadSchema>;

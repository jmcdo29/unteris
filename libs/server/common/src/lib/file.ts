import * as v from "valibot";

import { ValibotDto } from "./valibot.dto";

export const FileSchema = v.object({
	fieldname: v.string(),
	originalname: v.string(),
	mimetype: v.string(),
	// size: v.number(),
	// buffer: v.instance(Buffer),
});

export type File = v.InferOutput<typeof FileSchema>;

export class FileDto extends ValibotDto(FileSchema) {}

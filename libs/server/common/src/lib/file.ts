import { Output, instance, number, object, string } from "valibot";
import { ValibotDto } from "./valibot.dto";

export const FileSchema = object({
	fieldname: string(),
	originalname: string(),
	mimetype: string(),
	size: number(),
	buffer: instance(Buffer),
});

export type File = Output<typeof FileSchema>;

export class FileDto extends ValibotDto(FileSchema) {}

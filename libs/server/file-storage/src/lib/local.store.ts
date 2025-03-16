import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { Inject, Injectable } from "@nestjs/common";
import type { FileManager, LocalStoreConfig } from "./file-manager.interface";
import { FILE_LOCAL_CONFIG_TOKEN } from "./file-storage.constants";

@Injectable()
export class LocalStore implements FileManager {
	constructor(
		@Inject(FILE_LOCAL_CONFIG_TOKEN) private readonly config: LocalStoreConfig,
	) {}

	read(path: string): Promise<Buffer> {
		return readFile(join(this.config.path, path.replace("./images/", "./")));
	}

	write(path: string, data: string | Buffer): Promise<void> {
		return writeFile(
			join(this.config.path, path.replace("./images/", "./")),
			data,
		);
	}
}

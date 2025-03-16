<<<<<<< HEAD
import { createWriteStream } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import Stream from "node:stream";
=======
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
>>>>>>> 6631869 (chore: update code for biome rules)
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

<<<<<<< HEAD
	write(path: string, data: string | Buffer | Stream) {
		if (data instanceof Stream) {
			return new Promise<void>((resolve, reject) => {
				const outStream = createWriteStream(
					join(this.config.path, path.replace("./images/", "./")),
				);
				outStream.on("error", () => {
					reject(new Error(`Error uploading file ${path}`));
				});
				outStream.on("finish", () => resolve());
				data.pipe(outStream);
			});
		} else {
			return writeFile(
				join(this.config.path, path.replace("./images/", "./")),
				data.toString(),
			);
		}
=======
	write(path: string, data: string | Buffer): Promise<void> {
		return writeFile(
			join(this.config.path, path.replace("./images/", "./")),
			data,
		);
>>>>>>> 6631869 (chore: update code for biome rules)
	}
}

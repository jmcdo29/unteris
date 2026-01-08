import Stream from "node:stream";

export interface FileManager {
	write(path: string, data: string | Buffer | Stream): void | Promise<void>;

	read(path: string): Buffer | Promise<Buffer>;
}

export interface LocalStoreConfig {
	path: string;
}

export interface FileManager {
  write(path: string, data: string | Buffer): void | Promise<void>;

  read(path: string): Buffer | Promise<Buffer>;
}

export interface LocalStoreConfig {
  path: string;
}

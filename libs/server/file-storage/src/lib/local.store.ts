import { Inject, Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { FileManager, LocalStoreConfig } from './file-manager.interface';
import { FILE_LOCAL_CONFIG_TOKEN } from './file-storage.constants';

@Injectable()
export class LocalStore implements FileManager {
  constructor(
    @Inject(FILE_LOCAL_CONFIG_TOKEN) private readonly config: LocalStoreConfig
  ) {}

  read(path: string) {
    return readFile(join(this.config.path, path));
  }

  write(path: string, data: string | Buffer) {
    return writeFile(join(this.config.path, path), data);
  }
}

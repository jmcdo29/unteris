import { Inject, Injectable } from '@nestjs/common';
import { FILE_STORE_TOKEN } from './file-storage.constants';
import { FileManager } from './file-manager.interface';

@Injectable()
export class ServerFileStorageService {
  constructor(@Inject(FILE_STORE_TOKEN) private readonly store: FileManager) {}

  async readFileFromStore(path: string): Promise<Buffer> {
    return this.store.read(path);
  }

  async writeFileToStore(path: string, data: string | Buffer): Promise<void> {
    return this.store.write(path, data);
  }
}

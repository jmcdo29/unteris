import { Injectable } from '@nestjs/common';
import { createWriteStream, mkdirSync, statSync, WriteStream } from 'fs';
import { join } from 'path';

@Injectable()
export class StreamService {
  private stream: WriteStream;
  private filePath: string;

  constructor() {
    this.filePath = this.generateFilePath();
    this.stream = this.createStream();
  }

  getStream() {
    const newPath = this.generateFilePath();
    if (newPath !== this.filePath) {
      this.stream.close();
      this.filePath = newPath;
      this.stream = this.createStream();
    }
    return this.stream;
  }

  private generateFilePath(): string {
    const date = new Date(Date.now());
    return `${date.getUTCFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}-unteris.log`;
  }

  private createStream(): WriteStream {
    try {
      statSync(join(process.cwd(), 'logs'));
    } catch {
      mkdirSync(join(process.cwd(), 'logs'));
    }
    return createWriteStream(join(process.cwd(), 'logs', this.filePath), {
      flags: 'a',
    });
  }
}

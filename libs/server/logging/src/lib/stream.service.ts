import { Injectable } from '@nestjs/common';
import { createWriteStream, WriteStream } from 'fs';

@Injectable()
export class StreamService {
  private stream: WriteStream;
  private filePath: string;

  constructor() {
    this.filePath = this.generateFilePath();
    this.stream = createWriteStream(this.filePath, { flags: 'a' });
  }

  getStream() {
    const newPath = this.generateFilePath();
    if (newPath !== this.filePath) {
      this.stream.close();
      this.filePath = newPath;
      this.stream = createWriteStream(this.filePath);
    }
    return this.stream;
  }

  private generateFilePath(): string {
    const date = new Date(Date.now());
    return `${date.getUTCFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}-unteris.log`;
  }
}

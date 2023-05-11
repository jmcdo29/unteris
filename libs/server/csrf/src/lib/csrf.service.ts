import { Injectable } from '@nestjs/common';
import { ServerTokenService } from '@unteris/server/token';

@Injectable()
export class ServerCsrfService {
  constructor(private readonly tokenService: ServerTokenService) {}
  async generateToken(): Promise<string> {
    return this.tokenService.generateToken(256);
  }
}

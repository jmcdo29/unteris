import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CsrfGuard } from './csrf.guard';
import { ServerCsrfService } from './csrf.service';

@Controller('csrf')
export class ServerCsrfController {
  constructor(private serverCsrfService: ServerCsrfService) {}
  @Get()
  async getCsrfToken(
    @Req() { session }: { session: { id: string } }
  ): Promise<string> {
    return this.serverCsrfService.generateToken(session.id);
  }

  @Post('verify')
  @UseGuards(CsrfGuard)
  verifyCsrf() {
    return { success: true };
  }
}

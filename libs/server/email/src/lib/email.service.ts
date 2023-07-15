import { Injectable } from '@nestjs/common';
import { ServerConfigService } from '@unteris/server/config';
import { Transporter } from 'nodemailer';
import { VerificationEmail } from './email.constants';
import { InjectEmailTransport } from './email.decorators';

@Injectable()
export class ServerEmailService {
  constructor(
    @InjectEmailTransport() private readonly transport: Transporter,
    private readonly configService: ServerConfigService
  ) {}

  async sendVerificationEmail(
    username: string,
    email: string,
    verificationToken: string
  ): Promise<void> {
    await this.transport.sendMail({
      from: 'No Reply <no-reply@unteris.com>',
      subject: 'Email verification',
      to: email,
      html: VerificationEmail(
        username,
        email,
        verificationToken,
        this.configService.getServerHost()
      ),
    });
  }
}

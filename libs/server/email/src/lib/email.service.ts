import { Injectable } from '@nestjs/common';
import { ServerConfigService } from '@unteris/server/config';
import { Transporter } from 'nodemailer';
import { passwordResetEmail, verificationEmail } from './email.constants';
import { InjectEmailTransport } from './email.decorators';

@Injectable()
export class ServerEmailService {
	constructor(
		@InjectEmailTransport() private readonly transport: Transporter,
		private readonly configService: ServerConfigService,
	) {}

	async sendVerificationEmail(
		username: string,
		email: string,
		verificationToken: string,
	): Promise<void> {
		await this.transport.sendMail({
			from: 'No Reply <no-reply@unteris.com>',
			subject: 'Email verification',
			to: email,
			html: verificationEmail(
				username,
				verificationToken,
				this.configService.get('CORS'),
			),
		});
	}

	async sendPasswordResetEmail(
		email: string,
		resetToken: string,
	): Promise<void> {
		await this.transport.sendMail({
			from: 'No reply <no-reply@unteris.com>',
			subject: 'Reset Password',
			to: email,
			html: passwordResetEmail(resetToken, this.configService.get('CORS')),
		});
	}
}

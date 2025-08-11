import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugins';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendEmailOptions {
	  to: string | string[];
	  subject: string;
	  html: string;
	  attachements: Attachment[]
}

interface Attachment {
	filename: string;
	path: string;
}

export class EmailService {
	private trasnporter = nodemailer.createTransport({
		service: envs.MAILER_SERVICE,
		auth: {
			user: envs.EMAIL,
			pass: envs.EMAIL_SECRET_KEY,
		}
	})

	constructor(){}

	async sendEmail(options: SendEmailOptions): Promise<boolean> {
		const { to, subject, html, attachements = [] } = options;
		try{
			const sentInformation = await this.trasnporter.sendMail({
				to: to,
				subject: subject,
				html: html,
				attachments: attachements
			});
			
			const log = new LogEntity({
				level: LogSeverityLevel.low,
				message: 'Email sent successfully',
				origin: 'email.service.ts',
			})

			return true
		}catch (error) {
			const log = new LogEntity({
				level: LogSeverityLevel.high,
				message: 'Email failed',
				origin: 'email.service.ts',
			})

			return false;
		}
	}

	async sendEmailWithAttachment(to: string | string[]): Promise<boolean> {
		const subject = 'Test Email with Attachment';
		const html = '<h1>Hello from Noc attachment!</h1>';

		const attachements: Attachment[] = [
			{	filename: 'logs-low.log', path: './logs/logs-low.log'	},
			{	filename: 'logs-medium.log', path: './logs/logs-medium.log'	},
			{	filename: 'logs-high.log', path: './logs/logs-high.log'	}
		]

		return this.sendEmail({ to, subject, html, attachements });
	}
}
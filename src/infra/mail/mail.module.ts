import { forwardRef, Module } from '@nestjs/common'
import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { join } from 'path'
import { IEnvService } from '@/core/repositories/env-service.interface'
import { PrismaModule } from '../database/prisma/prisma.module'
import { EnvModule } from '../env/env.module'
import { FacadeModule } from '../http/facades/facade.module'
import { MailService } from './mail.service'
import {
	EmailVerificationMailSend,
	InviteMailSend,
	PasswordRecoveryMailSend,
	TokenMailSenderFactory,
} from './senders/token-mails'

@Module({
	imports: [
		EnvModule,
		forwardRef(() => PrismaModule),
		forwardRef(() => FacadeModule),
		MailerModule.forRootAsync({
			imports: [EnvModule],
			inject: [IEnvService],
			useFactory: async (envService: IEnvService) => ({
				transport: {
					host: envService.get('SMTP_HOST'),
					port: envService.get('SMTP_PORT'),
					secure: true,
					auth: {
						user: envService.get('SMTP_USER'),
						pass: envService.get('SMTP_PASS'),
					},
				},
				defaults: {
					from: envService.get('SMTP_FROM'),
				},
				template: {
					dir: join(__dirname, 'templates'),
					adapter: new HandlebarsAdapter(),
					options: {
						strict: true,
					},
				},
			}),
		}),
	],
	providers: [
		MailService,
		TokenMailSenderFactory,
		InviteMailSend,
		PasswordRecoveryMailSend,
		EmailVerificationMailSend,
	],
	exports: [
		TokenMailSenderFactory,
		InviteMailSend,
		PasswordRecoveryMailSend,
		EmailVerificationMailSend,
	], // 👈 export for DI
})
export class MailModule {}

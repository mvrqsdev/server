import { Body, Controller, Post } from '@nestjs/common'
import * as twilio from 'twilio'
import { IEnvService } from '@/core/repositories/env-service.interface'
import { Public } from '@/infra/guards/authentication/public'

@Controller('/twilio')
export class TwilioController {
	private readonly client: twilio.Twilio
	constructor(private env: IEnvService) {
		this.client = twilio(env.get('TWILIO_ACCOUNT_SID'), env.get('TWILIO_AUTH_TOKEN'))
	}
	@Post()
	@Public()
	async handle(@Body() body: any) {
		console.log(body)
		const sender = body.From
		await this.client.messages.create({
			body: 'Ola Pedrão tudo bem ?',
			from: this.env.get('TWILIO_NUMBER'),
			to: sender,
		})
		return { status: 'success' }
	}
}

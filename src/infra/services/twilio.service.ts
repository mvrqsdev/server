import { Injectable } from '@nestjs/common'
import { Twilio } from 'twilio'
import { IEnvService } from '@/core/repositories/env-service.interface'

@Injectable()
export class TwilioService extends Twilio {
	constructor(env: IEnvService) {
		super(env.get('TWILIO_ACCOUNT_SID'), env.get('TWILIO_AUTH_TOKEN'))
	}
}

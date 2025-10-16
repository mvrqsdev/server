import { Body, Controller, Post } from '@nestjs/common'
import { IAMessageFacade } from '@/application/facades/ia-message/ia-message.facade'
import { IAMessageProcessProps } from '@/application/facades/ia-message/interface'
import { Public } from '@/infra/guards/authentication/public'

@Controller('/twilio')
export class TwilioController {
	constructor(private iaMessageFacade: IAMessageFacade) {}
	@Post()
	@Public()
	async handle(@Body() body: IAMessageProcessProps) {
		await this.iaMessageFacade.process(body)
		return { status: 'success' }
	}
}

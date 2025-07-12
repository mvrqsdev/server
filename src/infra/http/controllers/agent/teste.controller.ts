import { Body, Controller, Post } from '@nestjs/common'
import { Public } from '@/infra/authentication/public'

@Controller('/teste')
export class TesteController {
	@Post()
	@Public()
	async handle(@Body() body: any) {
		console.log(body)
	}
}

import { Controller, Get } from '@nestjs/common'
import { Public } from '@/infra/authentication/public'

@Controller('/teste')
@Public()
export class TesteController {
	@Get()
	async handle() {
		return 'ok'
	}
}

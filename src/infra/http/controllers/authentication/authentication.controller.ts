import { Controller, Get } from '@nestjs/common'
import { Authentication } from '@/domain/authentication/entities/authentication.entity'
import { CurrentAuthentication } from '@/infra/guards/authentication/current-authentication.decorator'

@Controller('/auth/')
export class AuthenticationController {
	@Get('/session')
	async get(@CurrentAuthentication() authentication: Authentication) {
		return authentication
	}
}

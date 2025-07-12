import {
	BadRequestException,
	ConflictException,
	Controller,
	Delete,
	HttpCode,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthenticationNotFoundError } from '@/application/use-cases/authentication/errors/authentication-not-found.error'
import { RevokeAuthenticationByAuthenticationIdUseCase } from '@/application/use-cases/authentication/revole-authentication-by-authenticationId.use-case'
import { Authentication } from '@/domain/authentication/entities/authentication.entity'
import { CurrentAuthentication } from '@/infra/authentication/current-authentication.decorator'

@Controller('/auth/logout')
@ApiTags('Authentication')
export class AuthenticationLogoutController {
	constructor(
		private revokeAuthenticationByAuthenticationId: RevokeAuthenticationByAuthenticationIdUseCase,
	) {}

	@Delete()
	@HttpCode(204)
	async handle(@CurrentAuthentication() currentAuthentication: Authentication) {
		const result = await this.revokeAuthenticationByAuthenticationId.execute({
			authenticationId: currentAuthentication.id.toString(),
		})

		if (result.isLeft()) {
			const error = result.value
			switch (error.constructor) {
				case AuthenticationNotFoundError:
					throw new ConflictException(error.message)
				default:
					throw new BadRequestException(error.message)
			}
		}
	}
}

import { Injectable } from '@nestjs/common'
import { AuthenticationRepository } from '@/application/repositories/authentication/authentication.repository'
import { clock } from '@/core/helpers/dayjs'
import { IEnvService } from '@/core/repositories/env-service.interface'
import { BaseUseCase } from '@/core/use-cases/base-use-case'
import { Authentication } from '@/domain/authentication/entities/authentication.entity'

interface UpdateAuthenticationExpirationUseCaseRequest {
	authentication: Authentication
	expiresAt?: Date | null
}

interface UpdateAuthenticationExpirationUseCaseResponse {
	authentication: Authentication
}

@Injectable()
export class UpdateAuthenticationExpirationUseCase
	implements
		BaseUseCase<
			UpdateAuthenticationExpirationUseCaseRequest,
			UpdateAuthenticationExpirationUseCaseResponse
		>
{
	constructor(
		private authenticationRepository: AuthenticationRepository,
		private iEnvService: IEnvService,
	) {}
	async execute({
		authentication,
		expiresAt,
	}: UpdateAuthenticationExpirationUseCaseRequest): Promise<UpdateAuthenticationExpirationUseCaseResponse> {
		const isSession = authentication.strategy === 'Session'
		const isApiKey = authentication.strategy === 'ApiKey'

		if (isSession) {
			const expirationDate = clock().toDate()
			expirationDate.setDate(
				expirationDate.getDate() + this.iEnvService.get('AUTH_EXPIRATION_DAYS'),
			)

			authentication.expiresAt = expirationDate
			await this.authenticationRepository.save(authentication)
		}

		if (isApiKey && typeof expiresAt !== 'undefined') {
			authentication.expiresAt = expiresAt
			await this.authenticationRepository.save(authentication)
		}

		return {
			authentication,
		}
	}
}

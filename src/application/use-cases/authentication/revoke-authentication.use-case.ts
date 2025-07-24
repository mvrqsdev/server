import { Injectable } from '@nestjs/common'
import { AuthenticationRepository } from '@/application/repositories/authentication.repository'
import { clock } from '@/core/helpers/dayjs'
import { BaseUseCase } from '@/core/use-cases/base-use-case'
import { Authentication } from '@/domain/authentication/entities/authentication.entity'
import { AuthenticationAlreadyRevokedError } from './errors/authentication-already-revoked.error'

interface RevokeAuthenticationUseCaseRequest {
	authentication: Authentication
}

interface RevokeAuthenticationUseCaseResponse {
	authentication: Authentication
}

@Injectable()
export class RevokeAuthenticationUseCase
	implements
		BaseUseCase<RevokeAuthenticationUseCaseRequest, RevokeAuthenticationUseCaseResponse>
{
	constructor(private authenticationRepository: AuthenticationRepository) {}
	async execute({
		authentication,
	}: RevokeAuthenticationUseCaseRequest): Promise<RevokeAuthenticationUseCaseResponse> {
		if (authentication.revokedAt) {
			throw new AuthenticationAlreadyRevokedError()
		}

		authentication.revokedAt = clock().toDate()

		await this.authenticationRepository.save(authentication)

		return {
			authentication,
		}
	}
}

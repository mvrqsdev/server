import { Injectable } from '@nestjs/common'
import { clock } from '@/core/helpers/dayjs'
import { BaseUseCase } from '@/core/use-cases/base-use-case'
import { Authentication } from '@/domain/authentication/entities/authentication.entity'
import { AuthenticationExpiredError } from './errors/authentication-expired.error'
import { AuthenticationRevokedError } from './errors/authentication-revoked.error'

interface CheckIfAuthenticationIsValidUseCaseRequest {
	authentication: Authentication
}

interface CheckIfAuthenticationIsValidUseCaseResponse {
	validatedAuthentication: Authentication
}

@Injectable()
export class CheckIfAuthenticationIsValidUseCase
	implements
		BaseUseCase<
			CheckIfAuthenticationIsValidUseCaseRequest,
			CheckIfAuthenticationIsValidUseCaseResponse
		>
{
	async execute({
		authentication,
	}: CheckIfAuthenticationIsValidUseCaseRequest): Promise<CheckIfAuthenticationIsValidUseCaseResponse> {
		if (authentication.revokedAt) {
			throw new AuthenticationRevokedError()
		}
		const now = clock().toDate()
		if (authentication.expiresAt && authentication.expiresAt <= now) {
			throw new AuthenticationExpiredError()
		}

		return { validatedAuthentication: authentication }
	}
}

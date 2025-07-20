import { Injectable } from '@nestjs/common'
import { GetAuthenticationStrategy } from '@/application/facades/authentication/contract/get-authentication-strategy'
import { AuthenticationRepository } from '@/application/repositories/authentication/authentication.repository'
import { Authentication } from '@/domain/authentication/entities/authentication.entity'
import { AuthenticationNotFoundError } from './errors/authentication-not-found.error'

interface GetAuthenticationByTokenUseCaseRequest {
	token: string
}

interface GetAuthenticationByTokenUseCaseResponse {
	authentication: Authentication
}

@Injectable()
export class GetAuthenticationByTokenUseCase
	implements GetAuthenticationStrategy<GetAuthenticationByTokenUseCaseRequest>
{
	constructor(private authenticationRepository: AuthenticationRepository) {}
	async execute({
		token,
	}: GetAuthenticationByTokenUseCaseRequest): Promise<GetAuthenticationByTokenUseCaseResponse> {
		const authenticationWithSameToken =
			await this.authenticationRepository.getByToken(token)

		if (!authenticationWithSameToken) {
			throw new AuthenticationNotFoundError()
		}

		return {
			authentication: authenticationWithSameToken,
		}
	}
}

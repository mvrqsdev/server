import { Injectable } from '@nestjs/common'
import { GetAuthenticationStrategy } from '@/application/facades/authentication/contract/get-authentication-strategy'
import { AuthenticationRepository } from '@/application/repositories/authentication.repository'
import { Authentication } from '@/domain/authentication/entities/authentication.entity'
import { AuthenticationNotFoundError } from './errors/authentication-not-found.error'

export interface GetAuthenticationByTokenUseCaseRequest {
	token: string
}

@Injectable()
export class GetAuthenticationByTokenUseCase
	implements GetAuthenticationStrategy<GetAuthenticationByTokenUseCaseRequest>
{
	constructor(private authenticationRepository: AuthenticationRepository) {}
	async execute({ token }: GetAuthenticationByTokenUseCaseRequest): Promise<{
		authentication: Authentication
	}> {
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

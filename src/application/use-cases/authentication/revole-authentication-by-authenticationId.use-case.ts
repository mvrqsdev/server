import { Injectable } from '@nestjs/common'
import { AuthenticationRepository } from '@/application/repositories/authentication/authentication.repository'
import { Either, left, right } from '@/core/either'
import { AuthenticationNotFoundError } from './errors/authentication-not-found.error'

export interface RevokeAuthenticationByAuthenticationIdUseCaseRequest {
	authenticationId: string
}

type RevokeAuthenticationByAuthenticationIdUseCaseResponse = Either<
	AuthenticationNotFoundError,
	null
>
@Injectable()
export class RevokeAuthenticationByAuthenticationIdUseCase {
	constructor(private authenticationRepository: AuthenticationRepository) {}

	async execute({
		authenticationId,
	}: RevokeAuthenticationByAuthenticationIdUseCaseRequest): Promise<RevokeAuthenticationByAuthenticationIdUseCaseResponse> {
		const authentication = await this.authenticationRepository.findById(authenticationId)

		if (!authentication) {
			return left(new AuthenticationNotFoundError())
		}

		await this.authenticationRepository.revokeAuthentication(authentication)

		return right(null)
	}
}

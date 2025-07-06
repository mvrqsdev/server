import { Injectable } from '@nestjs/common'
import { Either, left, right } from '@/core/either'
import { Decrypter } from '../cryptography/decrypter'
import { AuthenticationRepository } from '../repositories/authentication.repository'
import { AuthenticationNotFoundError } from './errors/authentication-not-found.error'
import { FailedToDecryptError } from './errors/failed-to-decrypt.error'

export interface RevokeAuthenticationUseCaseRequest {
	token: string
}

type RevokeAuthenticationUseCaseResponse = Either<
	FailedToDecryptError | AuthenticationNotFoundError,
	null
>

@Injectable()
export class RevokeAuthenticationUseCase {
	constructor(
		private authenticationRepository: AuthenticationRepository,
		private decrypter: Decrypter,
	) {}

	async execute({
		token,
	}: RevokeAuthenticationUseCaseRequest): Promise<RevokeAuthenticationUseCaseResponse> {
		const decryptedToken = await this.decrypter.decrypt(token)

		if (!decryptedToken) {
			return left(new FailedToDecryptError())
		}

		const authenticationWithSameToken =
			await this.authenticationRepository.findByToken(decryptedToken)

		if (!authenticationWithSameToken) {
			return left(new AuthenticationNotFoundError())
		}

		await this.authenticationRepository.revokeAuthenticationExpiration(
			authenticationWithSameToken,
		)

		return right(null)
	}
}

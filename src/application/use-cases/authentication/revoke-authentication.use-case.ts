import { Injectable } from '@nestjs/common'
import { Decrypter } from '@/application/cryptography/decrypter'
import { FailedToDecryptError } from '@/application/cryptography/errors/failed-to-decrypt.error'
import { AuthenticationRepository } from '@/application/repositories/authentication/authentication.repository'
import { Either, left, right } from '@/core/either'
import { AuthenticationNotFoundError } from './errors/authentication-not-found.error'

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

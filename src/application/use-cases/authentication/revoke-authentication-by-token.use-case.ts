import { Injectable } from '@nestjs/common'
import { Decrypter } from '@/application/cryptography/decrypter'
import { FailedToDecryptError } from '@/application/cryptography/errors/failed-to-decrypt.error'
import { AuthenticationRepository } from '@/application/repositories/authentication/authentication.repository'
import { Either, left, right } from '@/core/either'
import { AuthenticationNotFoundError } from './errors/authentication-not-found.error'

export interface RevokeAuthenticationByTokenUseCaseRequest {
	token: string
}

type RevokeAuthenticationByTokenUseCaseResponse = Either<
	FailedToDecryptError | AuthenticationNotFoundError,
	null
>

@Injectable()
export class RevokeAuthenticationByTokenUseCase {
	constructor(
		private authenticationRepository: AuthenticationRepository,
		private decrypter: Decrypter,
	) {}

	async execute({
		token,
	}: RevokeAuthenticationByTokenUseCaseRequest): Promise<RevokeAuthenticationByTokenUseCaseResponse> {
		const decryptedToken = await this.decrypter.decrypt(token)

		if (!decryptedToken) {
			return left(new FailedToDecryptError())
		}

		const authenticationWithSameToken =
			await this.authenticationRepository.findByToken(decryptedToken)

		if (!authenticationWithSameToken) {
			return left(new AuthenticationNotFoundError())
		}

		await this.authenticationRepository.revokeAuthentication(authenticationWithSameToken)

		return right(null)
	}
}

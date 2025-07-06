import { Injectable } from '@nestjs/common'
import { Either, left, right } from '@/core/either'
import { Authentication } from '../../enterprise/entities/authentication.entity'
import { Decrypter } from '../cryptography/decrypter'
import { AuthenticationRepository } from '../repositories/authentication.repository'
import { AuthenticationNotFoundError } from './errors/authentication-not-found.error'
import { FailedToDecryptError } from './errors/failed-to-decrypt.error'

export interface UpdateAuthenticationExpirationUseCaseRequest {
	token: string
}

type UpdateAuthenticationExpirationUseCaseResponse = Either<
	FailedToDecryptError | AuthenticationNotFoundError,
	{ authentication: Authentication }
>

@Injectable()
export class UpdateAuthenticationExpirationUseCase {
	constructor(
		private authenticationRepository: AuthenticationRepository,
		private decrypter: Decrypter,
	) {}

	async execute({
		token,
	}: UpdateAuthenticationExpirationUseCaseRequest): Promise<UpdateAuthenticationExpirationUseCaseResponse> {
		const decryptedToken = await this.decrypter.decrypt(token)

		if (!decryptedToken) {
			return left(new FailedToDecryptError())
		}

		const authenticationWithSameToken =
			await this.authenticationRepository.findByToken(decryptedToken)

		if (!authenticationWithSameToken) {
			return left(new AuthenticationNotFoundError())
		}

		const authentication =
			await this.authenticationRepository.updateAuthenticationExpiration(
				authenticationWithSameToken,
			)

		return right({
			authentication,
		})
	}
}

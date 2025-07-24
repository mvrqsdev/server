import { Injectable } from '@nestjs/common'
import { GetTokenStrategy } from '@/application/facades/token/contract/get-token-strategy'
import { TokenRepository } from '@/application/repositories/token.repository'
import { Token } from '@/domain/token/entities/token.entity'
import { TokenNotFoundError } from '../authentication/errors/token-not-found.error'

export interface FindTokenByTokenCodeUseCaseRequest {
	tokenCode: string
}

@Injectable()
export class FindTokenByTokenCodeUseCase
	implements GetTokenStrategy<FindTokenByTokenCodeUseCaseRequest>
{
	constructor(private tokenRepository: TokenRepository) {}
	async execute({
		tokenCode,
	}: FindTokenByTokenCodeUseCaseRequest): Promise<{ token: Token }> {
		const token = await this.tokenRepository.findByToken(tokenCode)

		if (!token) {
			throw new TokenNotFoundError()
		}

		return { token }
	}
}

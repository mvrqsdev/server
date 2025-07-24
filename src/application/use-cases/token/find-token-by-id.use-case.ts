import { Injectable } from '@nestjs/common'
import { GetTokenStrategy } from '@/application/facades/token/contract/get-token-strategy'
import { TokenRepository } from '@/application/repositories/token.repository'
import { Token } from '@/domain/token/entities/token.entity'
import { TokenNotFoundError } from '../authentication/errors/token-not-found.error'

export interface FindTokenByIdUseCaseRequest {
	tokenId: string
}

@Injectable()
export class FindTokenByIdUseCase
	implements GetTokenStrategy<FindTokenByIdUseCaseRequest>
{
	constructor(private tokenRepository: TokenRepository) {}
	async execute({ tokenId }: FindTokenByIdUseCaseRequest): Promise<{ token: Token }> {
		const token = await this.tokenRepository.findById(tokenId)

		if (!token) {
			throw new TokenNotFoundError()
		}

		return { token }
	}
}

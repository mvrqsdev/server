import { Injectable } from '@nestjs/common'
import { TokenUsed } from '@/application/facades/token/interface'
import { TokenRepository } from '@/application/repositories/token.repository'
import { BaseUseCase } from '@/core/use-cases/base-use-case'
import { Token } from '@/domain/token/entities/token.entity'
import { TokenAlreadyUsedError } from './errors/token-already-used.error'

interface MarkTokenAsUsedUseCaseResponse {
	token: Token
}

@Injectable()
export class MarkTokenAsUsedUseCase
	implements BaseUseCase<TokenUsed, MarkTokenAsUsedUseCaseResponse>
{
	constructor(private tokenRepository: TokenRepository) {}
	async execute({ token }: TokenUsed): Promise<MarkTokenAsUsedUseCaseResponse> {
		if (token.isUsed()) {
			throw new TokenAlreadyUsedError()
		}

		token.markAsUsed()

		await this.tokenRepository.save(token)

		return {
			token,
		}
	}
}

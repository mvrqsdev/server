import { Injectable } from '@nestjs/common'
import { GetManyTokensStrategy } from '@/application/facades/token/contract/get-tokens-strategy'
import { TokenRepository } from '@/application/repositories/token.repository'
import { Token, TokenType } from '@/domain/token/entities/token.entity'

export interface FindAllTokensByFiltersRequest {
	agentId?: string
	type?: TokenType
	expired?: boolean
	used?: boolean
	field?: 'id' | 'agentId' | 'token' | 'type' | 'expiresAt' | 'createdAt' | 'usedAt'
	direction?: 'asc' | 'desc'
}

@Injectable()
export class FindAllTokensByFiltersUseCase
	implements GetManyTokensStrategy<FindAllTokensByFiltersRequest>
{
	constructor(private tokenRepository: TokenRepository) {}
	async execute(params: FindAllTokensByFiltersRequest): Promise<{ tokens: Token[] }> {
		const tokens = await this.tokenRepository.findByFilters(params)
		return { tokens }
	}
}

import { InjectQueue } from '@nestjs/bullmq'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bullmq'
import { TokenCreate } from '@/application/facades/token/interface'
import { TokenFacade } from '@/application/facades/token/token.facade'

import { CreateTokenUseCase } from '@/application/use-cases/token/create-token.use-case'
import { GenerateTokenStrategyFactory } from '@/application/use-cases/token/factories/generate-token-strategy.factory'
import {
	GetManyTokensStrategyFactory,
	GetManyTokensStrategyTypeMap,
} from '@/application/use-cases/token/factories/get-many-tokens-strategy.factory'
import {
	GetTokenStrategyFactory,
	GetTokenStrategyTypeMap,
} from '@/application/use-cases/token/factories/get-token-strategy.factory'
import { MarkTokenAsUsedUseCase } from '@/application/use-cases/token/mark-token-as-used.use-case'
import { Token } from '@/domain/token/entities/token.entity'

@Injectable()
export class NestTokenFacade implements TokenFacade {
	constructor(
		private generateTokenStrategyFactory: GenerateTokenStrategyFactory,
		private createTokenUseCase: CreateTokenUseCase,
		private getTokenStrategyFactory: GetTokenStrategyFactory,
		private getManyTokensStrategyFactory: GetManyTokensStrategyFactory,
		private markTokenAsUsedUseCase: MarkTokenAsUsedUseCase,
		@InjectQueue('token-mail') private queue: Queue,
	) {}
	async markTokenUsed<T extends keyof GetTokenStrategyTypeMap>(
		type: T,
		data: GetTokenStrategyTypeMap[T],
	): Promise<{ token: Token }> {
		const strategy = await this.getTokenStrategyFactory.getStrategy({ type })
		const { token } = await strategy.execute(data)
		const { token: usedToken } = await this.markTokenAsUsedUseCase.execute({ token })
		return {
			token: usedToken,
		}
	}
	async getTokens<T extends keyof GetManyTokensStrategyTypeMap>(
		type: T,
		data: GetManyTokensStrategyTypeMap[T],
	): Promise<{ tokens: Token[] }> {
		const strategy = await this.getManyTokensStrategyFactory.getStrategy({ type })
		return await strategy.execute(data)
	}
	async getToken<T extends keyof GetTokenStrategyTypeMap>(
		type: T,
		data: GetTokenStrategyTypeMap[T],
	): Promise<{ token: Token }> {
		const strategy = await this.getTokenStrategyFactory.getStrategy({ type })
		return await strategy.execute(data)
	}

	async create({
		agent,
		type,
	}: TokenCreate): Promise<{ token: Token; publicToken: string }> {
		const strategy = await this.generateTokenStrategyFactory.getStrategy(type)
		const { token } = await strategy.getToken({ agent })
		const publicToken = token.token.toPlain()
		await this.createTokenUseCase.execute({
			token,
		})
		await this.queue.add(`token-mail`, { tokenId: token.id.toString(), publicToken })
		return { token, publicToken }
	}
}

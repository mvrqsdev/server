import { Injectable } from '@nestjs/common'
import { GetTokenStrategy } from '@/application/facades/token/contract/get-token-strategy'
import { GetTokenStrategyNotFoundError } from '../errors/get-token-strategy-not-found.error'
import {
	FindTokenByIdUseCase,
	FindTokenByIdUseCaseRequest,
} from '../find-token-by-id.use-case'
import {
	FindTokenByTokenCodeUseCase,
	FindTokenByTokenCodeUseCaseRequest,
} from '../find-token-by-token-code.use-case'

export interface GetTokenStrategyTypeMap {
	id: FindTokenByIdUseCaseRequest
	token: FindTokenByTokenCodeUseCaseRequest
}

@Injectable()
export class GetTokenStrategyFactory {
	constructor(
		private findTokenByIdUseCase: FindTokenByIdUseCase,
		private findTokenByTokenCodeUseCase: FindTokenByTokenCodeUseCase,
	) {}

	async getStrategy<T extends keyof GetTokenStrategyTypeMap>({
		type,
	}: {
		type: T
	}): Promise<GetTokenStrategy<GetTokenStrategyTypeMap[T]>> {
		if (type === 'id') {
			return this.findTokenByIdUseCase as GetTokenStrategy<GetTokenStrategyTypeMap[T]>
		}

		if (type === 'token') {
			return this.findTokenByTokenCodeUseCase as GetTokenStrategy<
				GetTokenStrategyTypeMap[T]
			>
		}

		throw new GetTokenStrategyNotFoundError()
	}
}

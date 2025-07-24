import { Injectable } from '@nestjs/common'
import {
	AuthenticationStrategyTypeMap,
	GetAuthenticationStrategy,
} from '@/application/facades/authentication/contract/get-authentication-strategy'
import { GetAuthenticationStrategyNotFoundError } from '../errors/get-authentication-strategy-not-found.error'
import { GetAuthenticationByTokenUseCase } from '../get-authentication-by-token.use-case'

@Injectable()
export class GetAuthenticationFactory {
	constructor(private getAuthenticationByTokenUseCase: GetAuthenticationByTokenUseCase) {}

	async getAuthenticationStrategy<T extends keyof AuthenticationStrategyTypeMap>({
		type,
	}: {
		type: T
	}): Promise<GetAuthenticationStrategy<AuthenticationStrategyTypeMap[T]>> {
		if (type === 'token') {
			return this.getAuthenticationByTokenUseCase as GetAuthenticationStrategy<
				AuthenticationStrategyTypeMap[T]
			>
		}

		throw new GetAuthenticationStrategyNotFoundError()
	}
}

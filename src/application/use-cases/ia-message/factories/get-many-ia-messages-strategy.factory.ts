import { Injectable } from '@nestjs/common'
import { GetManyIAMessagesStrategy } from '@/application/facades/ia-message/contract/get-many-ia-messages.strategy'
import { GetManyIAMessagesStrategyNotFoundError } from '../errors/get-many-ia-messages-strategy-not-found.error'
import {
	FindManyIAMessagesByLeadId,
	FindManyIAMessagesByLeadIdRequest,
} from '../find-many-ia-messages-by-lead-id.use-case'

export interface GetManyIAMessagesStrategyFactoryTypeMap {
	byLeadId: FindManyIAMessagesByLeadIdRequest
}

@Injectable()
export class GetManyIAMessagesStrategyFactory {
	constructor(private findManyByLeadIdUseCase: FindManyIAMessagesByLeadId) {}
	async getStrategy<T extends keyof GetManyIAMessagesStrategyFactoryTypeMap>({
		type,
	}: {
		type: T
	}): Promise<GetManyIAMessagesStrategy<GetManyIAMessagesStrategyFactoryTypeMap[T]>> {
		if (type === 'byLeadId') {
			return this.findManyByLeadIdUseCase as GetManyIAMessagesStrategy<
				GetManyIAMessagesStrategyFactoryTypeMap[T]
			>
		}

		throw new GetManyIAMessagesStrategyNotFoundError()
	}
}

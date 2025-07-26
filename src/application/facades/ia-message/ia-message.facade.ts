import { GetIAMessageStrategyFactoryTypeMap } from '@/application/use-cases/ia-message/factories/get-ia-message-strategy.factory'
import { GetManyIAMessagesStrategyFactoryTypeMap } from '@/application/use-cases/ia-message/factories/get-many-ia-messages-strategy.factory'
import { IAMessage } from '@/domain/ia-message/entities/ia-message.entity'
import {
	IAMessageCreateProps,
	IAMessageProcessProps,
	IAMessageUpdateProps,
} from './interface'

export abstract class IAMessageFacade {
	abstract process(params: IAMessageProcessProps): Promise<void>
	abstract create(params: IAMessageCreateProps): Promise<{ iaMessage: IAMessage }>
	abstract update<T extends keyof GetIAMessageStrategyFactoryTypeMap>(
		type: T,
		data: GetIAMessageStrategyFactoryTypeMap[T],
		params: IAMessageUpdateProps,
	): Promise<{ iaMessage: IAMessage }>
	abstract getIaMessage<T extends keyof GetIAMessageStrategyFactoryTypeMap>(
		type: T,
		data: GetIAMessageStrategyFactoryTypeMap[T],
	): Promise<{ iaMessage: IAMessage }>

	abstract getMany<T extends keyof GetManyIAMessagesStrategyFactoryTypeMap>(
		type: T,
		data: GetManyIAMessagesStrategyFactoryTypeMap[T],
	): Promise<{ iaMessages: IAMessage[] }>
}

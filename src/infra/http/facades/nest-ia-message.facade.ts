import { Injectable } from '@nestjs/common'
import { IAMessageFacade } from '@/application/facades/ia-message/ia-message.facade'
import {
	IAMessageCreateProps,
	IAMessageProcessProps,
	IAMessageUpdateProps,
} from '@/application/facades/ia-message/interface'
import { CreateIAMessageUseCase } from '@/application/use-cases/ia-message/create-ia-message.use-case'
import {
	GetIAMessageStrategyFactory,
	GetIAMessageStrategyFactoryTypeMap,
} from '@/application/use-cases/ia-message/factories/get-ia-message-strategy.factory'
import {
	GetManyIAMessagesStrategyFactory,
	GetManyIAMessagesStrategyFactoryTypeMap,
} from '@/application/use-cases/ia-message/factories/get-many-ia-messages-strategy.factory'
import { UpdateIAMessageUseCase } from '@/application/use-cases/ia-message/update-ia-message.use-case'
import { IAMessage } from '@/domain/ia-message/entities/ia-message.entity'

@Injectable()
export class NestIAMessageFacade implements IAMessageFacade {
	constructor(
		private getIAMessageStrategyFactory: GetIAMessageStrategyFactory,
		private getManyIAMessagesStrategyFactory: GetManyIAMessagesStrategyFactory,
		private updateIAMessageUseCase: UpdateIAMessageUseCase,
		private createIAMessageUseCase: CreateIAMessageUseCase,
	) {}
	async process(params: IAMessageProcessProps): Promise<void> {
		throw new Error('Method not implemented.')
	}
	async create(params: IAMessageCreateProps): Promise<{ iaMessage: IAMessage }> {
		const { iaMessage } = await this.createIAMessageUseCase.execute(params)
		return {
			iaMessage,
		}
	}

	async update<T extends keyof GetIAMessageStrategyFactoryTypeMap>(
		type: T,
		data: GetIAMessageStrategyFactoryTypeMap[T],
		params: IAMessageUpdateProps,
	): Promise<{ iaMessage: IAMessage }> {
		const strategy = await this.getIAMessageStrategyFactory.getStrategy({ type })
		const { iaMessage } = await strategy.execute(data)
		const { iaMessage: updatedIAMessage } = await this.updateIAMessageUseCase.execute({
			iaMessage,
			...params,
		})
		return { iaMessage: updatedIAMessage }
	}
	async getIaMessage<T extends keyof GetIAMessageStrategyFactoryTypeMap>(
		type: T,
		data: GetIAMessageStrategyFactoryTypeMap[T],
	): Promise<{ iaMessage: IAMessage }> {
		const strategy = await this.getIAMessageStrategyFactory.getStrategy({ type })
		const { iaMessage } = await strategy.execute(data)
		return { iaMessage }
	}
	async getMany<T extends keyof GetManyIAMessagesStrategyFactoryTypeMap>(
		type: T,
		data: GetManyIAMessagesStrategyFactoryTypeMap[T],
	): Promise<{ iaMessages: IAMessage[] }> {
		const strategy = await this.getManyIAMessagesStrategyFactory.getStrategy({ type })
		const { iaMessages } = await strategy.execute(data)
		return { iaMessages }
	}
}

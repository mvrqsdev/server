import { Injectable } from '@nestjs/common'
import { GetIAMessageStrategy } from '@/application/facades/ia-message/contract/get-ia-messages.strategy'
import { IAMessageRepository } from '@/application/repositories/ia-message.repository'
import { IAMessage } from '@/domain/ia-message/entities/ia-message.entity'
import { IAMessageNotFoundError } from './errors/ia-message-not-found.error'

export interface FindIAMessageByIdUseCaseRequest {
	id: string
}
@Injectable()
export class FindIAMessageByIdUseCase
	implements GetIAMessageStrategy<FindIAMessageByIdUseCaseRequest>
{
	constructor(private iaMessageRepository: IAMessageRepository) {}
	async execute({
		id,
	}: FindIAMessageByIdUseCaseRequest): Promise<{ iaMessage: IAMessage }> {
		const iaMessage = await this.iaMessageRepository.findById(id)

		if (!iaMessage) {
			throw new IAMessageNotFoundError()
		}
		return {
			iaMessage,
		}
	}
}

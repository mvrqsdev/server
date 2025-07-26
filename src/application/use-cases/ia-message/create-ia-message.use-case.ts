import { Injectable } from '@nestjs/common'
import { IAMessageCreateProps } from '@/application/facades/ia-message/interface'
import { IAMessageRepository } from '@/application/repositories/ia-message.repository'
import { BaseUseCase } from '@/core/use-cases/base-use-case'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { IAMessage } from '@/domain/ia-message/entities/ia-message.entity'

export interface CreateIAMessageUseCaseRequest {
	iaMessage: IAMessage
}

@Injectable()
export class CreateIAMessageUseCase
	implements BaseUseCase<IAMessageCreateProps, CreateIAMessageUseCaseRequest>
{
	constructor(private iaMessageRepository: IAMessageRepository) {}
	async execute({
		leadId,
		contactId,
		content,
		mediaUrl,
		mediaKey,
		messageType,
		fromBot,
		sessionId,
	}: IAMessageCreateProps): Promise<CreateIAMessageUseCaseRequest> {
		const iaMessage = IAMessage.create({
			leadId: new UniqueEntityID(leadId),
			contactId: new UniqueEntityID(contactId),
			content,
			mediaUrl,
			mediaKey,
			messageType,
			fromBot,
			sessionId,
		})

		await this.iaMessageRepository.create(iaMessage)

		return {
			iaMessage,
		}
	}
}

import { Injectable } from '@nestjs/common'
import { IAMessageUpdateProps } from '@/application/facades/ia-message/interface'
import { IAMessageRepository } from '@/application/repositories/ia-message.repository'
import { BaseUseCase } from '@/core/use-cases/base-use-case'
import { IAMessage } from '@/domain/ia-message/entities/ia-message.entity'

type UpdateIAMessageUseCaseRequest = IAMessageUpdateProps & { iaMessage: IAMessage }

interface UpdateIAMessageUseCaseResponse {
	iaMessage: IAMessage
}

@Injectable()
export class UpdateIAMessageUseCase
	implements BaseUseCase<UpdateIAMessageUseCaseRequest, UpdateIAMessageUseCaseResponse>
{
	constructor(private iaMessageRepository: IAMessageRepository) {}
	async execute({
		iaMessage,
		content,
		mediaKey,
		mediaUrl,
	}: UpdateIAMessageUseCaseRequest): Promise<UpdateIAMessageUseCaseResponse> {
		if (typeof content !== 'undefined') {
			iaMessage.content = content
		}

		if (typeof mediaKey !== 'undefined') {
			iaMessage.mediaKey = mediaKey
		}

		if (typeof mediaUrl !== 'undefined') {
			iaMessage.mediaUrl = mediaUrl
		}

		await this.iaMessageRepository.save(iaMessage)

		return {
			iaMessage,
		}
	}
}

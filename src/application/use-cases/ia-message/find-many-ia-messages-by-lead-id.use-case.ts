import { Injectable } from '@nestjs/common'
import { GetManyIAMessagesStrategy } from '@/application/facades/ia-message/contract/get-many-ia-messages.strategy'
import { IAMessageRepository } from '@/application/repositories/ia-message.repository'
import { IAMessage } from '@/domain/ia-message/entities/ia-message.entity'

export interface FindManyIAMessagesByLeadIdRequest {
	leadId: string
}
@Injectable()
export class FindManyIAMessagesByLeadId
	implements GetManyIAMessagesStrategy<FindManyIAMessagesByLeadIdRequest>
{
	constructor(private iaMessageRepository: IAMessageRepository) {}
	async execute({
		leadId,
	}: FindManyIAMessagesByLeadIdRequest): Promise<{ iaMessages: IAMessage[] }> {
		const iaMessages = await this.iaMessageRepository.findManyByLeadId(leadId)
		return {
			iaMessages,
		}
	}
}

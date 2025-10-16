import { Injectable } from '@nestjs/common'
import { GetLeadStrategy } from '@/application/facades/lead/contract/get-lead-strategy'
import { LeadRepository } from '@/application/repositories/lead.repository'
import { Lead } from '@/domain/lead/entities/lead.entity'
import { LeadNotFoundError } from './errors/lead-not-found.error'

export interface FindLastLeadByContactIdUseCaseRequest {
	contactId: string
}

@Injectable()
export class FindLastLeadByContactIdUseCase
	implements GetLeadStrategy<FindLastLeadByContactIdUseCaseRequest>
{
	constructor(private leadRepository: LeadRepository) {}
	async execute({
		contactId,
	}: FindLastLeadByContactIdUseCaseRequest): Promise<{ lead: Lead }> {
		const lead = await this.leadRepository.findLastLeadByContactId(contactId)

		if (!lead) {
			throw new LeadNotFoundError()
		}

		return {
			lead,
		}
	}
}

import { Injectable } from '@nestjs/common'
import { GetLeadStrategy } from '@/application/facades/lead/contract/get-lead-strategy'
import { LeadRepository } from '@/application/repositories/lead.repository'
import { Lead } from '@/domain/lead/entities/lead.entity'
import { LeadNotFoundError } from './errors/lead-not-found.error'

export interface FindLeadByIdUseCaseRequest {
	leadId: string
}

@Injectable()
export class FindLeadByIdUseCase implements GetLeadStrategy<FindLeadByIdUseCaseRequest> {
	constructor(private leadRepository: LeadRepository) {}
	async execute({ leadId }: FindLeadByIdUseCaseRequest): Promise<{ lead: Lead }> {
		const lead = await this.leadRepository.findById(leadId)

		if (!lead) {
			throw new LeadNotFoundError()
		}

		return {
			lead,
		}
	}
}

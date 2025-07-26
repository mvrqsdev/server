import { Injectable } from '@nestjs/common'
import { LeadCreate } from '@/application/facades/lead/interface'
import { LeadRepository } from '@/application/repositories/lead.repository'
import { BaseUseCase } from '@/core/use-cases/base-use-case'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { Lead } from '@/domain/lead/entities/lead.entity'

export interface CreateLeadUseCaseResponse {
	lead: Lead
}

@Injectable()
export class CreateLeadUseCase
	implements BaseUseCase<LeadCreate, CreateLeadUseCaseResponse>
{
	constructor(private leadRepository: LeadRepository) {}
	async execute({ contactId, agentId }: LeadCreate): Promise<CreateLeadUseCaseResponse> {
		const lead = Lead.create({
			contactId: new UniqueEntityID(contactId),
			agentId: agentId ? new UniqueEntityID(agentId) : null,
		})

		await this.leadRepository.create(lead)
		return {
			lead,
		}
	}
}

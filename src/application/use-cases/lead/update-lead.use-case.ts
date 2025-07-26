import { Injectable } from '@nestjs/common'
import { LeadUpdate } from '@/application/facades/lead/interface'
import { LeadRepository } from '@/application/repositories/lead.repository'
import { BaseUseCase } from '@/core/use-cases/base-use-case'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { Lead } from '@/domain/lead/entities/lead.entity'

export type UpdateLeadUseCaseRequest = LeadUpdate & { lead: Lead }

export interface UpdateLeadUseCaseResponse {
	lead: Lead
}

@Injectable()
export class UpdateLeadUseCase
	implements BaseUseCase<UpdateLeadUseCaseRequest, UpdateLeadUseCaseResponse>
{
	constructor(private leadRepository: LeadRepository) {}
	async execute({
		lead,
		agentId,
		converted,
		status,
		value,
	}: UpdateLeadUseCaseRequest): Promise<UpdateLeadUseCaseResponse> {
		if (typeof agentId !== 'undefined') {
			lead.agentId = agentId ? new UniqueEntityID(agentId) : null
		}

		if (typeof converted !== 'undefined') {
			lead.converted = converted
		}

		if (typeof status !== 'undefined') {
			if (status === 'scheduling') {
				lead.Scheduling()
			}
		}

		if (typeof value !== 'undefined') {
			lead.value = value
		}

		await this.leadRepository.save(lead)

		return {
			lead,
		}
	}
}

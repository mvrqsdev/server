import { Injectable } from '@nestjs/common'
import { LeadRepository } from '@/application/repositories/leads/lead.repository'
import { Either, left, right } from '@/core/either'
import { LeadDetails } from '@/domain/lead/value-objects/lead-datails.value-object'
import { LeadNotFoundError } from './errors/lead-not-found.error'

export interface GetLeadByIdUseCaseRequest {
	leadId: string
}

type GetLeadByIdUseCaseResponse = Either<LeadNotFoundError, { lead: LeadDetails }>

@Injectable()
export class GetLeadByIdUseCase {
	constructor(private leadRepository: LeadRepository) {}

	async execute({
		leadId,
	}: GetLeadByIdUseCaseRequest): Promise<GetLeadByIdUseCaseResponse> {
		const lead = await this.leadRepository.findDetailsById(leadId)

		if (!lead) {
			return left(new LeadNotFoundError())
		}

		return right({
			lead,
		})
	}
}

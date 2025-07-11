import { Injectable } from '@nestjs/common'
import { LeadRepository } from '@/application/repositories/leads/lead.repository'
import { SchedulingRepository } from '@/application/repositories/scheduling/scheduling.repository'
import { NoAgentInRouletteError } from '@/application/services/roulette/errors/no-agent-in-roulette.error'
import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { Lead } from '@/domain/lead/entities/lead.entity'
import { LeadScheduling } from '@/domain/lead/entities/lead-scheduling.watched-list'
import { LeadStateFactory } from '@/domain/lead/factories/lead-state-factory'
import { Scheduling } from '@/domain/scheduling/entities/scheduling.entity'
import { SchedulingStateFactory } from '@/domain/scheduling/factories/scheduling-state-factory'
import { LeadAlreadyExistsError } from './errors/lead-already-exists.error'
import { LeadNotFoundError } from './errors/lead-not-found.error'

interface SchedulingProps {
	id?: string
	agentId: string
	status: string
	scheduled: Date
}

export interface UpdateLeadUseCaseRequest {
	requester: Agent
	agentId?: string
	leadId: string
	schedulings: SchedulingProps[]
	status: string
	converted?: boolean
	value?: number
}

type UpdateLeadUseCaseResponse = Either<
	LeadNotFoundError | NoAgentInRouletteError | LeadAlreadyExistsError,
	{ lead: Lead }
>

@Injectable()
export class UpdateLeadUseCase {
	constructor(
		private leadRepository: LeadRepository,
		private schedulingRepository: SchedulingRepository,
	) {}

	async execute({
		requester,
		schedulings,
		agentId,
		leadId,
		status,
		converted,
		value,
	}: UpdateLeadUseCaseRequest): Promise<UpdateLeadUseCaseResponse> {
		const agentIsAdmin = requester.role === 'Admin'
		const agentIsMaster = requester.master

		const lead = await this.leadRepository.findById(leadId)

		if (!lead) {
			return left(new LeadNotFoundError())
		}
		const currentLeadSchedulings =
			await this.schedulingRepository.findManyByLeadId(leadId)

		const leadSchedulingList = new LeadScheduling(currentLeadSchedulings)

		const leadSchedulings = schedulings.map((scheduling) => {
			return Scheduling.create(
				{
					leadId: lead.id,
					agentId: new UniqueEntityID(scheduling.agentId),
					scheduled: scheduling.scheduled,
					status: SchedulingStateFactory.create(scheduling.status),
				},
				scheduling.id ? new UniqueEntityID(scheduling.id) : undefined,
			)
		})

		leadSchedulingList.update(leadSchedulings)

		if (agentIsAdmin || agentIsMaster) {
			if (agentId) {
				lead.agentId = new UniqueEntityID(agentId)
			}
		}
		lead[LeadStateFactory.create(status).state]()
		lead.schedulings = leadSchedulingList
		lead.converted = converted ?? lead.converted
		lead.value = value ?? lead.value

		await this.leadRepository.save(lead)

		return right({ lead })
	}
}

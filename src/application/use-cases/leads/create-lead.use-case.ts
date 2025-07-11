import { Injectable } from '@nestjs/common'
import { AgentRepository } from '@/application/repositories/agents/agent.repository'
import { ContactRepository } from '@/application/repositories/contact/contact.repository'
import { LeadRepository } from '@/application/repositories/leads/lead.repository'
import { NoAgentInRouletteError } from '@/application/services/roulette/errors/no-agent-in-roulette.error'
import { RouletteService } from '@/application/services/roulette/roulette.service'
import { Either, left, right } from '@/core/either'
import { WhatsappNumber } from '@/core/value-objects/whatsapp-number.value-object'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { Contact } from '@/domain/contact/entities/contact.entity'
import { Lead } from '@/domain/lead/entities/lead.entity'
import { Off } from '@/domain/lead/states/off-state'
import { LeadAlreadyExistsError } from './errors/lead-already-exists.error'
import { LeadNotFoundError } from './errors/lead-not-found.error'

export interface CreateLeadUseCaseRequest {
	name: string
	whatsappNumber: string
	email: string
}

type CreateLeadUseCaseResponse = Either<
	LeadNotFoundError | NoAgentInRouletteError | LeadAlreadyExistsError,
	{ lead: Lead }
>

@Injectable()
export class CreateLeadUseCase {
	constructor(
		private contactRepository: ContactRepository,
		private leadRepository: LeadRepository,
		private agentRepository: AgentRepository,
		private rouletteService: RouletteService,
	) {}

	async execute({
		name,
		email,
		whatsappNumber,
	}: CreateLeadUseCaseRequest): Promise<CreateLeadUseCaseResponse> {
		const agentsInRotation = await this.agentRepository.findAgentsInRotation()
		const admins = await this.agentRepository.findAdmins()
		const lastLead = await this.leadRepository.findLastLeadFromAgents(agentsInRotation)
		let nextAgent: Agent
		try {
			nextAgent = this.rouletteService.getNextAgent({
				agentsInRotation,
				lastLead,
				adminAgents: admins,
			})
		} catch (error) {
			if (error instanceof NoAgentInRouletteError) {
				return left(error)
			}
			throw error
		}

		const whatsapp = WhatsappNumber.createFromText(whatsappNumber)

		const contact = await this.contactRepository.findByWhatsappNumber(whatsapp.whatsappId)

		if (!contact) {
			const newContact = Contact.create({ name, email, whatsappNumber: whatsapp })
			const lead = Lead.create({ contactId: newContact.id, agentId: nextAgent.id })

			await this.contactRepository.create(newContact)
			await this.leadRepository.create(lead)

			return right({ lead })
		}

		const lastLeadFromContact = await this.leadRepository.findLastLeadByContactId(
			contact.id.toString(),
		)

		if (!lastLeadFromContact) {
			return left(new LeadNotFoundError())
		}

		if (!(lastLeadFromContact.status instanceof Off)) {
			return left(new LeadAlreadyExistsError())
		}

		const lead = Lead.create({ contactId: contact.id, agentId: nextAgent.id })
		await this.leadRepository.create(lead)

		return right({ lead })
	}
}

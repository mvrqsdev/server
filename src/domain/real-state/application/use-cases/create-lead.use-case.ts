import { Injectable } from '@nestjs/common'
import { Either, left, right } from '@/core/either'
import { Agent } from '../../enterprise/entities/agent.entity'
import { Contact } from '../../enterprise/entities/contact.entity'
import { Lead } from '../../enterprise/entities/lead.entity'
import { WhatsappNumber } from '../../enterprise/entities/value-objects/whatsapp-number.value-object'
import { AgentRepository } from '../repositories/agent.repository'
import { ContactRepository } from '../repositories/contact.repository'
import { LeadRepository } from '../repositories/lead.repository'
import { RouleteService } from '../services/roulette.service'
import { LeadAlreadyExistsError } from './errors/lead-already-exists.error'
import { NoAgentInRouletteError } from './errors/no-agent-in-roulette.error'

export interface CreateLeadUseCaseRequest {
	name: string
	whatsappNumber: string
	email: string
}

type CreateLeadUseCaseResponse = Either<
	NoAgentInRouletteError | LeadAlreadyExistsError,
	{ lead: Lead }
>

@Injectable()
export class CreateLeadUseCase {
	constructor(
		private contactRepository: ContactRepository,
		private leadRepository: LeadRepository,
		private agentRepository: AgentRepository,
		private rouletteService: RouleteService,
	) {}

	async execute({
		name,
		email,
		whatsappNumber,
	}: CreateLeadUseCaseRequest): Promise<CreateLeadUseCaseResponse> {
		const whatsapp = WhatsappNumber.createFromText(whatsappNumber)
		let contact = await this.contactRepository.findByWhatsappNumber(whatsapp.whatsappId)
		if (!contact) {
			contact = Contact.create({
				name,
				email,
				whatsappNumber: WhatsappNumber.createFromText(whatsappNumber),
			})
			await this.contactRepository.create(contact)
		}

		let lead = await this.leadRepository.findLastLeadByContactId(contact.id.toString())

		if (lead && lead.status !== 'Finished') {
			return left(new LeadAlreadyExistsError(contact.name))
		}

		if (!lead) {
			const agentsInRotation = await this.agentRepository.findAgentsInRotation()
			const adminAgents = await this.agentRepository.findAdmins()
			const lastLead = await this.leadRepository.findLastLeadFromAgents(agentsInRotation)

			let agent: Agent
			try {
				agent = this.rouletteService.getNextAgent({
					agentsInRotation,
					lastLead,
					adminAgents,
				})
			} catch {
				return left(new NoAgentInRouletteError())
			}

			lead = Lead.create({
				contactId: contact.id,
				agentId: agent.id,
			})

			await this.leadRepository.create(lead)
		}

		return right({ lead })
	}
}

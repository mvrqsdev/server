import { Lead } from '../entities/lead.entity'

export abstract class LeadState {
	abstract changeStatus(lead: Lead, status: LeadState): LeadState
	abstract needToChangeAgent(lead: Lead): boolean
	abstract get name(): string
}

import { Lead } from '../entities/lead.entity'

export abstract class LeadState {
	public get state() {
		return this.constructor.name
	}
	abstract validate(lead: Lead): boolean
	abstract PreService(lead: Lead): void
	abstract Service(lead: Lead): void
	abstract Scheduling(lead: Lead): void
	abstract Visit(lead: Lead): void
	abstract Folder(lead: Lead): void
	abstract CreditAnalysis(lead: Lead): void
	abstract Proposal(lead: Lead): void
	abstract Contract(lead: Lead): void
	abstract Off(lead: Lead): void
}

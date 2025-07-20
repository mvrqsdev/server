import { Lead } from '../entities/lead.entity'
import { CreditAnalysis } from './credit-analysis-state'
import { ContractError } from './errors/contract.error'
import { OffError } from './errors/off.error'
import { PreServiceError } from './errors/pre-service.error'
import { ProposalError } from './errors/proposal.error'
import { SchedulingError } from './errors/scheduling.error'
import { ServiceError } from './errors/service.error'
import { LeadState } from './lead-state.interface'
import { Visit } from './visit-state'

export class Folder implements LeadState {
	validate(lead: Lead): boolean {
		if (!lead.updatedAt) return false
		const dias = 7
		const hora = 24

		const now = new Date()
		const diffInMs = now.getTime() - lead.updatedAt.getTime()

		return diffInMs >= dias * hora * 60 * 60 * 1000
	}
	get state(): string {
		return this.constructor.name
	}
	PreService(_: Lead): void {
		throw new PreServiceError()
	}
	Service(_: Lead): void {
		throw new ServiceError()
	}
	Scheduling(_: Lead): void {
		throw new SchedulingError()
	}
	Visit(lead: Lead): void {
		lead.status = new Visit()
	}
	Folder(lead: Lead): void {
		lead.status = new Folder()
	}
	CreditAnalysis(lead: Lead): void {
		lead.status = new CreditAnalysis()
	}
	Proposal(_: Lead): void {
		throw new ProposalError()
	}
	Contract(_: Lead): void {
		throw new ContractError()
	}
	Off(_: Lead): void {
		throw new OffError()
	}
}

import { Lead } from '../entities/lead.entity'
import { ContractError } from './errors/contract.error'
import { CreditAnalysisError } from './errors/credit-analysis.error'
import { FolderError } from './errors/folder.error'
import { OffError } from './errors/off.error'
import { ProposalError } from './errors/proposal.error'
import { SchedulingError } from './errors/scheduling.error'
import { VisitError } from './errors/visit.error'
import { LeadState } from './lead-state.interface'
import { Service } from './service-state'

export class PreService implements LeadState {
	get state(): string {
		return this.constructor.name
	}
	validate(lead: Lead): boolean {
		if (!lead.updatedAt) return false
		const dias = 1
		const hora = 1

		const now = new Date()
		const diffInMs = now.getTime() - lead.updatedAt.getTime()

		return diffInMs >= dias * hora * 60 * 60 * 1000
	}
	PreService(lead: Lead): void {
		lead.status = new PreService()
	}

	Service(lead: Lead): void {
		lead.status = new Service()
	}
	Scheduling(_: Lead): void {
		throw new SchedulingError()
	}
	Visit(_: Lead): void {
		throw new VisitError()
	}
	Folder(_: Lead): void {
		throw new FolderError()
	}
	CreditAnalysis(_: Lead): void {
		throw new CreditAnalysisError()
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

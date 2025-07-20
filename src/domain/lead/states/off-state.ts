import { Lead } from '../entities/lead.entity'
import { Contract } from './contract-state'
import { CreditAnalysisError } from './errors/credit-analysis.error'
import { FolderError } from './errors/folder.error'
import { PreServiceError } from './errors/pre-service.error'
import { ProposalError } from './errors/proposal.error'
import { SchedulingError } from './errors/scheduling.error'
import { ServiceError } from './errors/service.error'
import { VisitError } from './errors/visit.error'
import { LeadState } from './lead-state.interface'

export class Off implements LeadState {
	validate(_: Lead): boolean {
		return false
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
	Contract(lead: Lead): void {
		lead.status = new Contract()
	}
	Off(lead: Lead): void {
		lead.status = new Off()
	}
}

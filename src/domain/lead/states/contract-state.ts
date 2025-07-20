import { Lead } from '../entities/lead.entity'
import { CreditAnalysisError } from './errors/credit-analysis.error'
import { FolderError } from './errors/folder.error'
import { PreServiceError } from './errors/pre-service.error'
import { SchedulingError } from './errors/scheduling.error'
import { ServiceError } from './errors/service.error'
import { VisitError } from './errors/visit.error'
import { LeadState } from './lead-state.interface'
import { Off } from './off-state'
import { Proposal } from './proposal-state'

export class Contract implements LeadState {
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
	Proposal(lead: Lead): void {
		lead.status = new Proposal()
	}
	Contract(lead: Lead): void {
		lead.status = new Contract()
	}
	Off(lead: Lead): void {
		lead.status = new Off()
	}
}

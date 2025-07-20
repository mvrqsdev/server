import { clock } from '@/core/helpers/dayjs'
import { Scheduled } from '@/domain/scheduling/states/scheduled-status'
import { Lead } from '../entities/lead.entity'
import { ContractError } from './errors/contract.error'
import { CreditAnalysisError } from './errors/credit-analysis.error'
import { FolderError } from './errors/folder.error'
import { ProposalError } from './errors/proposal.error'
import { SchedulingValidationError } from './errors/scheduling-validation.error'
import { VisitError } from './errors/visit.error'
import { LeadState } from './lead-state.interface'
import { Off } from './off-state'
import { PreService } from './pre-service-state'
import { Scheduling } from './scheduling-state'

export class Service implements LeadState {
	validate(lead: Lead): boolean {
		if (!lead.updatedAt) return false
		const dias = 1
		const hora = 24

		const now = clock().toDate()
		const diffInMs = now.getTime() - lead.updatedAt.getTime()

		return diffInMs >= dias * hora * 60 * 60 * 1000
	}
	get state(): string {
		return this.constructor.name
	}
	PreService(lead: Lead): void {
		lead.status = new PreService()
	}
	Service(lead: Lead): void {
		lead.status = new Service()
	}
	Scheduling(lead: Lead): void {
		const hasScheduled = lead.schedulings
			.getItems()
			.some((scheduled) => scheduled.status instanceof Scheduled)

		if (!hasScheduled) {
			throw new SchedulingValidationError()
		}
		lead.status = new Scheduling()
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
	Off(lead: Lead): void {
		lead.status = new Off()
	}
}

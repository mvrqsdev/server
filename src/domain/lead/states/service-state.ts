import { ErrorCodes } from '@/core/errors/codes'
import { DomainError } from '@/core/errors/errors/domain.error'
import { Scheduled } from '@/domain/scheduling/states/scheduled-status'
import { Lead } from '../entities/lead.entity'
import { LeadState } from './lead-state.interface'
import { Off } from './off-state'
import { PreService } from './pre-service-state'
import { Scheduling } from './scheduling-state'

export class Service implements LeadState {
	validate(lead: Lead): boolean {
		if (!lead.updatedAt) return false
		const dias = 1
		const hora = 24

		const now = new Date()
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
			throw new DomainError(ErrorCodes.LEAD.LEAD_STATE.SCHEDULING.VALIDATION_ERROR)
		}
		lead.status = new Scheduling()
	}
	Visit(_: Lead): void {
		throw new DomainError(ErrorCodes.LEAD.LEAD_STATE.VISIT.DEFAULT)
	}
	Folder(_: Lead): void {
		throw new DomainError(ErrorCodes.LEAD.LEAD_STATE.FOLDER.DEFAULT)
	}
	CreditAnalysis(_: Lead): void {
		throw new DomainError(ErrorCodes.LEAD.LEAD_STATE.CREDIT_ANALYSIS.DEFAULT)
	}
	Proposal(_: Lead): void {
		throw new DomainError(ErrorCodes.LEAD.LEAD_STATE.PROPOSAL.DEFAULT)
	}
	Contract(_: Lead): void {
		throw new DomainError(ErrorCodes.LEAD.LEAD_STATE.CONTRACT.DEFAULT)
	}
	Off(lead: Lead): void {
		lead.status = new Off()
	}
}

import { ErrorCodes } from '@/core/errors/codes'
import { DomainError } from '@/core/errors/errors/domain.error'
import { Scheduled } from '@/domain/scheduling/states/scheduled-status'
import { Visited } from '@/domain/scheduling/states/visited-status'
import { Lead } from '../entities/lead.entity'
import { Folder } from './folder-state'
import { LeadState } from './lead-state.interface'
import { Scheduling } from './scheduling-state'

export class Visit implements LeadState {
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
		throw new DomainError(ErrorCodes.LEAD.LEAD_STATE.PRE_SERVICE.DEFAULT)
	}
	Service(_: Lead): void {
		throw new DomainError(ErrorCodes.LEAD.LEAD_STATE.SERVICE.DEFAULT)
	}
	Scheduling(lead: Lead): void {
		const schedulings = lead.schedulings.getItems()
		const hasSchedulings = schedulings.length > 0
		const hasScheduledOpen = schedulings.some(
			(scheduling) => scheduling.status instanceof Scheduled,
		)

		if (!hasSchedulings || !hasScheduledOpen) {
			throw new DomainError(ErrorCodes.LEAD.LEAD_STATE.SCHEDULING.VALIDATION_ERROR)
		}
		lead.status = new Scheduling()
	}
	Visit(lead: Lead): void {
		lead.status = new Visit()
	}
	Folder(lead: Lead): void {
		const schedulings = lead.schedulings.getItems()
		const hasSchedulings = schedulings.length > 0
		const allScheduledEnded = schedulings.every(
			(scheduled) => scheduled.status instanceof Visited,
		)

		if (!hasSchedulings || !allScheduledEnded) {
			throw new DomainError(ErrorCodes.LEAD.LEAD_STATE.FOLDER.VALIDATION_ERROR)
		}

		lead.status = new Folder()
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
	Off(_: Lead): void {
		throw new DomainError(ErrorCodes.LEAD.LEAD_STATE.OFF.DEFAULT)
	}
}

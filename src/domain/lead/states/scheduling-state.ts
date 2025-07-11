import { ErrorCodes } from '@/core/errors/codes'
import { DomainError } from '@/core/errors/errors/domain.error'
import { Visited } from '@/domain/scheduling/states/visited-status'
import { Lead } from '../entities/lead.entity'
import { LeadState } from './lead-state.interface'
import { Service } from './service-state'
import { Visit } from './visit-state'

export class Scheduling implements LeadState {
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
		throw new DomainError('Method not implemented.')
	}
	Service(lead: Lead): void {
		const schedulings = lead.schedulings.getItems()
		const allScheduledEnded = schedulings.every(
			(scheduling) => scheduling.status instanceof Visited,
		)
		const hasSchedulings = schedulings.length > 0

		if (!hasSchedulings || !allScheduledEnded) {
			throw new DomainError(ErrorCodes.LEAD.LEAD_STATE.SERVICE.VALIDATION_ERROR)
		}

		lead.status = new Service()
	}
	Scheduling(lead: Lead): void {
		lead.status = new Scheduling()
	}
	Visit(lead: Lead): void {
		const schedulings = lead.schedulings.getItems()
		const allScheduledEnded = schedulings.every(
			(scheduled) => scheduled.status instanceof Visited,
		)
		const hasSchedulings = schedulings.length > 0

		if (!hasSchedulings || !allScheduledEnded) {
			throw new DomainError(ErrorCodes.LEAD.LEAD_STATE.VISIT.VALIDATION_ERROR)
		}

		lead.status = new Visit()
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
	Off(_: Lead): void {
		throw new DomainError(ErrorCodes.LEAD.LEAD_STATE.OFF.DEFAULT)
	}
}

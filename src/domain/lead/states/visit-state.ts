import { Scheduled } from '@/domain/scheduling/states/scheduled-status'
import { Visited } from '@/domain/scheduling/states/visited-status'
import { Lead } from '../entities/lead.entity'
import { ContractError } from './errors/contract.error'
import { CreditAnalysisError } from './errors/credit-analysis.error'
import { FolderValidationError } from './errors/folder-validation.error'
import { OffError } from './errors/off.error'
import { PreServiceError } from './errors/pre-service.error'
import { ProposalError } from './errors/proposal.error'
import { SchedulingError } from './errors/scheduling.error'
import { ServiceError } from './errors/service.error'
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
		throw new PreServiceError()
	}
	Service(_: Lead): void {
		throw new ServiceError()
	}
	Scheduling(lead: Lead): void {
		const schedulings = lead.schedulings.getItems()
		const hasSchedulings = schedulings.length > 0
		const hasScheduledOpen = schedulings.some(
			(scheduling) => scheduling.status instanceof Scheduled,
		)

		if (!hasSchedulings || !hasScheduledOpen) {
			throw new SchedulingError()
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
			throw new FolderValidationError()
		}

		lead.status = new Folder()
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

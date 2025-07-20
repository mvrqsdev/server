import { clock } from '@/core/helpers/dayjs'
import { Visited } from '@/domain/scheduling/states/visited-status'
import { Lead } from '../entities/lead.entity'
import { ContractError } from './errors/contract.error'
import { CreditAnalysisError } from './errors/credit-analysis.error'
import { FolderError } from './errors/folder.error'
import { OffError } from './errors/off.error'
import { PreServiceError } from './errors/pre-service.error'
import { ProposalError } from './errors/proposal.error'
import { ServiceValidationError } from './errors/service-validation.error'
import { VisitValidationError } from './errors/visit-validation.error'
import { LeadState } from './lead-state.interface'
import { Service } from './service-state'
import { Visit } from './visit-state'

export class Scheduling implements LeadState {
	validate(lead: Lead): boolean {
		if (!lead.updatedAt) return false
		const dias = 7
		const hora = 24

		const now = clock().toDate()
		const diffInMs = now.getTime() - lead.updatedAt.getTime()

		return diffInMs >= dias * hora * 60 * 60 * 1000
	}
	get state(): string {
		return this.constructor.name
	}
	PreService(_: Lead): void {
		throw new PreServiceError()
	}
	Service(lead: Lead): void {
		const schedulings = lead.schedulings.getItems()
		const allScheduledEnded = schedulings.every(
			(scheduling) => scheduling.status instanceof Visited,
		)
		const hasSchedulings = schedulings.length > 0

		if (!hasSchedulings || !allScheduledEnded) {
			throw new ServiceValidationError()
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
			throw new VisitValidationError()
		}

		lead.status = new Visit()
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

import { ErrorCodes } from '@/core/errors/codes'
import { DomainError } from '@/core/errors/errors/domain.error'
import { Lead } from '../entities/lead.entity'
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
		throw new DomainError(ErrorCodes.LEAD.LEAD_STATE.SCHEDULING.DEFAULT)
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
	Off(_: Lead): void {
		throw new DomainError(ErrorCodes.LEAD.LEAD_STATE.OFF.DEFAULT)
	}
}

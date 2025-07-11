import { ErrorCodes } from '@/core/errors/codes'
import { DomainError } from '@/core/errors/errors/domain.error'
import { Lead } from '../entities/lead.entity'
import { Contract } from './contract-state'
import { CreditAnalysis } from './credit-analysis-state'
import { LeadState } from './lead-state.interface'

export class Proposal implements LeadState {
	validate(lead: Lead): boolean {
		if (!lead.updatedAt) return false
		const dias = 15
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
	Scheduling(_: Lead): void {
		throw new DomainError(ErrorCodes.LEAD.LEAD_STATE.SCHEDULING.DEFAULT)
	}
	Visit(_: Lead): void {
		throw new DomainError(ErrorCodes.LEAD.LEAD_STATE.VISIT.DEFAULT)
	}
	Folder(_: Lead): void {
		throw new DomainError(ErrorCodes.LEAD.LEAD_STATE.FOLDER.DEFAULT)
	}
	CreditAnalysis(lead: Lead): void {
		lead.status = new CreditAnalysis()
	}
	Proposal(lead: Lead): void {
		lead.status = new Proposal()
	}
	Contract(lead: Lead): void {
		lead.status = new Contract()
	}
	Off(_: Lead): void {
		throw new DomainError(ErrorCodes.LEAD.LEAD_STATE.OFF.DEFAULT)
	}
}

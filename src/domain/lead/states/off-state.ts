import { ErrorCodes } from '@/core/errors/codes'
import { DomainError } from '@/core/errors/errors/domain.error'
import { Lead } from '../entities/lead.entity'
import { Contract } from './contract-state'
import { LeadState } from './lead-state.interface'

export class Off implements LeadState {
	validate(_: Lead): boolean {
		return false
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
	CreditAnalysis(_: Lead): void {
		throw new DomainError(ErrorCodes.LEAD.LEAD_STATE.CREDIT_ANALYSIS.DEFAULT)
	}
	Proposal(_: Lead): void {
		throw new DomainError(ErrorCodes.LEAD.LEAD_STATE.PROPOSAL.DEFAULT)
	}
	Contract(lead: Lead): void {
		lead.status = new Contract()
	}
	Off(lead: Lead): void {
		lead.status = new Off()
	}
}

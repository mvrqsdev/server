import { ErrorCodes } from '@/core/errors/codes'
import { DomainError } from '@/core/errors/errors/domain.error'
import { Lead } from '../entities/lead.entity'
import { Folder } from './folder-state'
import { LeadState } from './lead-state.interface'
import { Proposal } from './proposal-state'

export class CreditAnalysis implements LeadState {
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
	Scheduling(_: Lead): void {
		throw new DomainError(ErrorCodes.LEAD.LEAD_STATE.SCHEDULING.DEFAULT)
	}
	Visit(_: Lead): void {
		throw new DomainError(ErrorCodes.LEAD.LEAD_STATE.VISIT.DEFAULT)
	}
	Folder(lead: Lead): void {
		lead.status = new Folder()
	}
	CreditAnalysis(lead: Lead): void {
		lead.status = new CreditAnalysis()
	}
	Proposal(lead: Lead): void {
		lead.status = new Proposal()
	}
	Contract(_: Lead): void {
		throw new DomainError(ErrorCodes.LEAD.LEAD_STATE.CONTRACT.DEFAULT)
	}
	Off(_: Lead): void {
		throw new DomainError(ErrorCodes.LEAD.LEAD_STATE.OFF.DEFAULT)
	}
}

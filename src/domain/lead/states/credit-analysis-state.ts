import { clock } from '@/core/helpers/dayjs'
import { Lead } from '../entities/lead.entity'
import { ContractError } from './errors/contract.error'
import { OffError } from './errors/off.error'
import { PreServiceError } from './errors/pre-service.error'
import { SchedulingError } from './errors/scheduling.error'
import { ServiceError } from './errors/service.error'
import { VisitError } from './errors/visit.error'
import { Folder } from './folder-state'
import { LeadState } from './lead-state.interface'
import { Proposal } from './proposal-state'

export class CreditAnalysis implements LeadState {
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
	Service(_: Lead): void {
		throw new ServiceError()
	}
	Scheduling(_: Lead): void {
		throw new SchedulingError()
	}
	Visit(_: Lead): void {
		throw new VisitError()
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
		throw new ContractError()
	}
	Off(_: Lead): void {
		throw new OffError()
	}
}

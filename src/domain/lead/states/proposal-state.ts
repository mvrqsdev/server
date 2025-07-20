import { clock } from '@/core/helpers/dayjs'
import { Lead } from '../entities/lead.entity'
import { Contract } from './contract-state'
import { CreditAnalysis } from './credit-analysis-state'
import { FolderError } from './errors/folder.error'
import { OffError } from './errors/off.error'
import { PreServiceError } from './errors/pre-service.error'
import { SchedulingError } from './errors/scheduling.error'
import { ServiceError } from './errors/service.error'
import { VisitError } from './errors/visit.error'
import { LeadState } from './lead-state.interface'

export class Proposal implements LeadState {
	validate(lead: Lead): boolean {
		if (!lead.updatedAt) return false
		const dias = 15
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
	Folder(_: Lead): void {
		throw new FolderError()
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
		throw new OffError()
	}
}

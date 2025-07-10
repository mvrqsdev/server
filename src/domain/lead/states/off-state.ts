import { DomainError } from '@/core/errors/errors/domain.error'
import { Lead } from '../entities/lead.entity'
import { LeadState } from './lead-state.interface'

export class OffState extends LeadState {
	get name(): string {
		return 'Off'
	}
	needToChangeAgent(lead: Lead): boolean {
		return false
	}

	changeStatus(lead: Lead, newStatus: LeadState): LeadState {
		throw new DomainError('The lead has already been finalized.')
	}
}

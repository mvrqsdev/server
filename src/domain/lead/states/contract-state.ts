import { DomainError } from '@/core/errors/errors/domain.error'
import { Lead } from '../entities/lead.entity'
import { LeadState } from './lead-state.interface'
import { OffState } from './off-state'
import { ProposalState } from './proposal-state'

export class ContractState extends LeadState {
	get name(): string {
		return 'Contract'
	}
	needToChangeAgent(lead: Lead): boolean {
		return false
	}

	changeStatus(lead: Lead, newStatus: LeadState): LeadState {
		if (newStatus instanceof ProposalState) {
			return newStatus
		}

		if (newStatus instanceof OffState) {
			return newStatus
		}

		throw new DomainError('The Lead is still in the contract status.')
	}
}

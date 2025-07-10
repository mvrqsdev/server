import { DomainError } from '@/core/errors/errors/domain.error'
import { Lead } from '../entities/lead.entity'
import { ContractState } from './contract-state'
import { CreditAnalysisState } from './credit-analysis-state'
import { LeadState } from './lead-state.interface'

export class ProposalState extends LeadState {
	get name(): string {
		return 'Proposal'
	}
	needToChangeAgent(lead: Lead): boolean {
		if (!lead.updatedAt) return false
		const dias = 15
		const hora = 24 * dias

		const now = new Date()
		const diffInMs = now.getTime() - lead.updatedAt.getTime()

		return diffInMs >= hora * 60 * 60 * 1000
	}

	changeStatus(lead: Lead, newStatus: LeadState): LeadState {
		if (newStatus instanceof CreditAnalysisState) {
			return newStatus
		}

		if (newStatus instanceof ContractState) {
			return newStatus
		}

		throw new DomainError('The Lead is still in the proposal status.')
	}
}

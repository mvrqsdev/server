import { DomainError } from '@/core/errors/errors/domain.error'
import { Lead } from '../entities/lead.entity'
import { FolderState } from './folder-state'
import { LeadState } from './lead-state.interface'
import { ProposalState } from './proposal-state'

export class CreditAnalysisState extends LeadState {
	get name(): string {
		return 'CreditAnalysis'
	}
	needToChangeAgent(lead: Lead): boolean {
		if (!lead.updatedAt) return false
		const dias = 7
		const hora = 24 * dias

		const now = new Date()
		const diffInMs = now.getTime() - lead.updatedAt.getTime()

		return diffInMs >= hora * 60 * 60 * 1000
	}

	changeStatus(lead: Lead, newStatus: LeadState): LeadState {
		if (newStatus instanceof FolderState) {
			return newStatus
		}

		if (newStatus instanceof ProposalState) {
			return newStatus
		}

		throw new DomainError('The Lead is still in the creditanalysis status.')
	}
}

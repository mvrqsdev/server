import { DomainError } from '@/core/errors/errors/domain.error'
import { Lead } from '../entities/lead.entity'
import { LeadState } from './lead-state.interface'
import { ServiceState } from './service-state'

export class PreServiceState extends LeadState {
	needToChangeAgent(lead: Lead): boolean {
		if (!lead.updatedAt) return false
		const dias = 1
		const hora = 1 * dias

		const now = new Date()
		const diffInMs = now.getTime() - lead.updatedAt.getTime()

		return diffInMs >= hora * 60 * 60 * 1000
	}
	get name(): string {
		return 'PreService'
	}
	changeStatus(lead: Lead, newStatus: LeadState): LeadState {
		if (newStatus instanceof ServiceState) {
			return newStatus
		}

		throw new DomainError('The lead already in the PreService.')
	}
}

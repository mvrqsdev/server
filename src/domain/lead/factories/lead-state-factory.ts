import { DomainError } from '@/core/errors/errors/domain.error'
import { ContractState } from '../states/contract-state'
import { CreditAnalysisState } from '../states/credit-analysis-state'
import { FolderState } from '../states/folder-state'
import { LeadState } from '../states/lead-state.interface'
import { OffState } from '../states/off-state'
import { PreServiceState } from '../states/pre-service-state'
import { ProposalState } from '../states/proposal-state'
import { SchedulingState } from '../states/scheduling-state'
import { ServiceState } from '../states/service-state'
import { VisitState } from '../states/visit-state'

export class LeadStateFactory {
	static create(status: string): LeadState {
		if (status === 'PreService') {
			return new PreServiceState()
		}

		if (status === 'Service') {
			return new ServiceState()
		}

		if (status === 'Scheduling') {
			return new SchedulingState()
		}

		if (status === 'Visit') {
			return new VisitState()
		}

		if (status === 'Folder') {
			return new FolderState()
		}

		if (status === 'CreditAnalysis') {
			return new CreditAnalysisState()
		}

		if (status === 'Proposal') {
			return new ProposalState()
		}

		if (status === 'Contract') {
			return new ContractState()
		}

		if (status === 'Off') {
			return new OffState()
		}

		throw new DomainError('Lead status not found.')
	}
}

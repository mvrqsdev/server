import { Injectable } from '@nestjs/common'
import { ErrorCodes } from '@/core/errors/codes'
import { DomainError } from '@/core/errors/errors/domain.error'
import { Contract } from '../states/contract-state'
import { CreditAnalysis } from '../states/credit-analysis-state'
import { Folder } from '../states/folder-state'
import { LeadState } from '../states/lead-state.interface'
import { Off } from '../states/off-state'
import { PreService } from '../states/pre-service-state'
import { Proposal } from '../states/proposal-state'
import { Scheduling } from '../states/scheduling-state'
import { Service } from '../states/service-state'
import { Visit } from '../states/visit-state'

@Injectable()
export class LeadStateFactory {
	static create(status: string): LeadState {
		if (status === 'PreService') {
			return new PreService()
		}

		if (status === 'Service') {
			return new Service()
		}

		if (status === 'Scheduling') {
			return new Scheduling()
		}

		if (status === 'Visit') {
			return new Visit()
		}

		if (status === 'Folder') {
			return new Folder()
		}

		if (status === 'CreditAnalysis') {
			return new CreditAnalysis()
		}

		if (status === 'Proposal') {
			return new Proposal()
		}

		if (status === 'Contract') {
			return new Contract()
		}

		if (status === 'Off') {
			return new Off()
		}

		throw new DomainError(ErrorCodes.LEAD.LEAD_STATE.FACTORY.DEFAULT)
	}
}

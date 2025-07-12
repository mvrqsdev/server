import { Injectable } from '@nestjs/common'
import { ErrorCodes } from '@/core/errors/codes'
import { DomainError } from '@/core/errors/errors/domain.error'
import { Close } from '../states/close-state'
import { Connecting } from '../states/connecting-state'
import { ConnectionState } from '../states/connection-state.interface'
import { Inactive } from '../states/inactive-state'
import { Open } from '../states/open-state'

@Injectable()
export class ConnectionStateFactory {
	static create(status: string): ConnectionState {
		if (status === 'Close') {
			return new Close()
		}

		if (status === 'Connecting') {
			return new Connecting()
		}

		if (status === 'Open') {
			return new Open()
		}

		if (status === 'Inactive') {
			return new Inactive()
		}

		throw new DomainError(ErrorCodes.LEAD.LEAD_STATE.FACTORY.DEFAULT)
	}
}

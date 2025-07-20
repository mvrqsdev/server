import { Inject, Injectable } from '@nestjs/common'
import { ConnectionStatusFactory } from '@/application/repositories/connection/factories/connection-status.factory'
import { ConnectionStateNotFoundError } from '@/application/repositories/connection/factories/errors/connection-state-not-found.error'
import { ConnectionStatus } from '@/domain/connection/contracts/connection-status.contract'

@Injectable()
export class PrismaConnectionStatusFactory implements ConnectionStatusFactory {
	constructor(
		@Inject('ConnectionStatusClose')
		private readonly closeState: ConnectionStatus,

		@Inject('ConnectionStatusOpen')
		private readonly openState: ConnectionStatus,

		@Inject('ConnectionStatusConnecting')
		private readonly connectingState: ConnectionStatus,
	) {}
	create(state: string): ConnectionStatus {
		switch (state) {
			case 'open':
				return this.openState
			case 'close':
				return this.closeState
			case 'connecting':
				return this.connectingState
			default:
				throw new ConnectionStateNotFoundError()
		}
	}
}

import { ConnectionStatus } from '@/domain/connection/contracts/connection-status.contract'

export abstract class ConnectionStatusFactory {
	abstract create(state: string): ConnectionStatus
}

import makeWASocket, { useMultiFileAuthState } from '@whiskeysockets/baileys'
import { Agent } from '../entities/agent.entity'

export abstract class AgentStatus {
	abstract getName(): string
	abstract inactiveAgent(agent: Agent): Promise<void>
	abstract inviteAgent(agent: Agent): Promise<void>
	abstract activeAgent(agent: Agent): Promise<void>
}

export class Teste {
	async handle() {
		const { state } = await useMultiFileAuthState('')

		const socket = makeWASocket({ auth: state })

		socket.logout()
	}
}

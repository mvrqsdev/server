import { Injectable } from '@nestjs/common'
import { AgentRepository } from '@/application/repositories/agents/agent.repository'
import { ConnectionRepository } from '@/application/repositories/connection/connection.repository'
import { EvolutionInternalError } from '@/application/webservice/evolution/errors/EvolutionInternal.error'
import { EvolutionRepository } from '@/application/webservice/evolution/evolution.repository'
import { CreateInstanceResponse } from '@/application/webservice/evolution/interface'
import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { WhatsappNumber } from '@/core/value-objects/whatsapp-number.value-object'
import { Connection } from '@/domain/connection/entities/connection.entity'
import { InstanceName } from '@/domain/connection/value-objects/instance-name.value-object'
import { AgentNotFoundError } from '../agents/errors/agent-not-found.error'
import { ConnectionAlreadyExistsError } from './errors/connection-already-exists.error'

export interface CreateConnectionUseCaseRequest {
	agentId: string
	whatsappNumber: string
}

type CreateConnectionUseCaseResponse = Either<
	AgentNotFoundError | ConnectionAlreadyExistsError | EvolutionInternalError,
	{ connection: Connection; instance: CreateInstanceResponse }
>

export interface DeleteConnectionUseCaseRequest {
	connectionId: string
}

@Injectable()
export class CreateConnectionUseCase {
	constructor(
		private agentRepository: AgentRepository,
		private connectionRepository: ConnectionRepository,
		private evolutionService: EvolutionRepository,
	) {}

	async execute({
		whatsappNumber,
		agentId,
	}: CreateConnectionUseCaseRequest): Promise<CreateConnectionUseCaseResponse> {
		const agent = await this.agentRepository.findById(agentId)

		if (!agent) {
			return left(new AgentNotFoundError())
		}

		const connectionWithSameAgentId =
			await this.connectionRepository.findByAgentId(agentId)

		if (connectionWithSameAgentId) {
			return left(new ConnectionAlreadyExistsError(agent.name))
		}

		const connection = Connection.create({
			agentId: agent.id,
			name: InstanceName.createFromText(agent.name),
			token: new UniqueEntityID(),
			whatsappNumber: WhatsappNumber.createFromText(whatsappNumber),
		})

		await this.connectionRepository.create(connection)

		const evolutionConnection = await this.evolutionService.createInstance({
			instanceName: connection.name.value,
			integration: 'WHATSAPP-BAILEYS',
			number: connection.whatsappNumber.whatsappId,
		})

		if (!evolutionConnection) {
			await this.connectionRepository.delete(connection)
			return left(new EvolutionInternalError())
		}

		return right({
			connection,
			instance: evolutionConnection,
		})
	}
}

import { Injectable } from '@nestjs/common'
import { AgentRepository } from '@/application/repositories/agents/agent.repository'
import { ConnectionRepository } from '@/application/repositories/connection/connection.repository'
import { IEvolutionService } from '@/application/webservice/evolution/evolution.service'
import { Either, left, right } from '@/core/either'
import { WhatsappNumber } from '@/core/value-objects/whatsapp-number.value-object'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { Connection } from '@/domain/connection/entities/connection.entity'
import { ConnectionToken } from '@/domain/connection/value-objects/connection-token.value-object'
import { InstanceName } from '@/domain/connection/value-objects/instance-name.value-object'
import { InstanceId } from '@/domain/connection/value-objects/instanceId.value-object'
import { AgentMasterRequiredError } from '../agents/errors/agent-master-required.error'
import { AgentNotFoundError } from '../agents/errors/agent-not-found.error'
import { ConnectionAlreadyExistsError } from './errors/connection-already-exists.error'
import { ConnectionPrincipalNotFoundError } from './errors/connection-principal-not-found.error'

export interface CreateConnectionUseCaseRequest {
	requester: Agent
	agentId: string
	number: string
}

type CreateConnectionUseCaseResponse = Either<
	| AgentNotFoundError
	| ConnectionAlreadyExistsError
	| AgentMasterRequiredError
	| ConnectionPrincipalNotFoundError,
	{ connection: Connection }
>

@Injectable()
export class CreateConnectionUseCase {
	constructor(
		private agentRepository: AgentRepository,
		private connectionRepository: ConnectionRepository,
		private evolutionService: IEvolutionService,
	) {}

	async execute({
		requester,
		number,
		agentId,
	}: CreateConnectionUseCaseRequest): Promise<CreateConnectionUseCaseResponse> {
		const agent = await this.agentRepository.findById(agentId)

		if (!agent) {
			return left(new AgentNotFoundError())
		}

		const connectionWithSameNumber = await this.connectionRepository.findByNumber(number)

		if (connectionWithSameNumber) {
			return left(new ConnectionAlreadyExistsError())
		}

		const connectionPrincipal = await this.connectionRepository.findPrincipal()

		if (!connectionPrincipal) {
			if (!requester.master) {
				return left(new AgentMasterRequiredError())
			}
		}

		const hasPrincipal = !!connectionPrincipal
		const responsibleAgentId = !hasPrincipal ? requester.id : agent.id
		const isPrincipal = !hasPrincipal && requester.master ? true : undefined

		const instanceName = new InstanceName()
		const whatsappNumber = WhatsappNumber.create(number)
		const evolutionInstance = await this.evolutionService.createInstance({
			instanceName: instanceName.toString(),
			integration: 'WHATSAPP-BAILEYS',
			number: whatsappNumber.number,
		})

		const connection = Connection.create({
			agentId: responsibleAgentId,
			name: instanceName,
			instanceId: new InstanceId(evolutionInstance.instance.instanceId),
			number: whatsappNumber,
			token: new ConnectionToken(evolutionInstance.hash),
			principal: isPrincipal,
		})

		await this.connectionRepository.create(connection)

		return right({
			connection,
		})
	}
}

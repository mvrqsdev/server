import { Injectable } from '@nestjs/common'
import { User as PrismaAgent, Connection as PrismaConnection } from '@prisma/client'
import {
	AgentStateType,
	AgentStatusFactory,
} from '@/application/repositories/agent/factories/agent-status.factory'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { AgentDetails } from '@/domain/agent/value-objects/agent-details.value-object'
import { PrismaConnectionMapper } from '../../connection/mappers/connection.prisma-mapper'

export type PrismaAgentDetails = PrismaAgent & {
	Connection: PrismaConnection[]
}

@Injectable()
export class PrismaAgentDetailsMapper {
	constructor(
		private connectionMapper: PrismaConnectionMapper,
		private agentStatusFactory: AgentStatusFactory,
	) {}
	toDomain(raw: PrismaAgentDetails): AgentDetails {
		return AgentDetails.create({
			agentId: new UniqueEntityID(raw.id),
			name: raw.name,
			isInRotation: raw.isInRotation,
			email: raw.email,
			master: raw.master,
			status: this.agentStatusFactory.create(raw.status as AgentStateType),
			connections: raw.Connection.map(this.connectionMapper.toDomain),
			createdAt: raw.createdAt,
			updatedAt: raw.updatedAt,
		})
	}
}

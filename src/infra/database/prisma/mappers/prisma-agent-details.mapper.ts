import { User as PrismaAgent, Connection as PrismaConnection } from '@prisma/client'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { AgentDetails } from '@/domain/agent/value-objects/agent-details.value-object'
import { PrismaConnectionMapper } from './prisma-connection.mapper'

type PrismaAgentDetails = PrismaAgent & {
	Connection?: PrismaConnection | null
}

export class PrismaAgentDetailsMapper {
	static toDomain(raw: PrismaAgentDetails): AgentDetails {
		return AgentDetails.create({
			agentId: new UniqueEntityID(raw.id),
			name: raw.name,
			isInRotation: raw.isInRotation,
			email: raw.email,
			role: raw.role,
			master: raw.master,
			status: raw.status,
			connection: raw.Connection ? PrismaConnectionMapper.toDomain(raw.Connection) : null,
			createdAt: raw.createdAt,
			updatedAt: raw.updatedAt,
		})
	}
}

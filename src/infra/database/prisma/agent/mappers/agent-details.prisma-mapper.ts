import { Injectable } from '@nestjs/common'
import { User as PrismaAgent } from '@prisma/client'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { AgentStatusFactory } from '@/domain/agent/factories/agent-status.factory'
import { AgentDetails } from '@/domain/agent/value-objects/agent-details.value-object'

export type PrismaAgentDetails = PrismaAgent

@Injectable()
export class PrismaAgentDetailsMapper {
	constructor(private agentStatusFactory: AgentStatusFactory) {}
	toDomain(raw: PrismaAgentDetails): AgentDetails {
		return AgentDetails.create({
			agentId: new UniqueEntityID(raw.id),
			name: raw.name,
			isInRotation: raw.isInRotation,
			email: raw.email,
			master: raw.master,
			status: this.agentStatusFactory.create(raw.status),
			createdAt: raw.createdAt,
			updatedAt: raw.updatedAt,
		})
	}
}

import { Injectable } from '@nestjs/common'
import { Prisma, User as PrismaAgent } from '@prisma/client'
import { AgentStatusFactory } from '@/application/repositories/agent/factories/agent-status.factory'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { Agent } from '@/domain/agent/entities/agent.entity'

@Injectable()
export class PrismaAgentMapper {
	constructor(private agentStatusFactory: AgentStatusFactory) {}
	toDomain(raw: PrismaAgent): Agent {
		return Agent.create(
			{
				name: raw.name,
				email: raw.email,
				password: raw.password,
				status: this.agentStatusFactory.create(raw.status),
				master: raw.master,
				isInRotation: raw.isInRotation,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id),
		)
	}

	toPrisma(agent: Agent): Prisma.UserUncheckedCreateInput {
		return {
			id: agent.id.toString(),
			name: agent.name,
			email: agent.email,
			password: agent.password,
			master: agent.master,
			status: agent.status.getName(),
			isInRotation: agent.isInRotation,
			createdAt: agent.createdAt,
			updatedAt: agent.updatedAt,
		}
	}
}

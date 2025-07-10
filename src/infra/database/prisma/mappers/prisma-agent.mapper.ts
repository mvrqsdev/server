import { Prisma, User as PrismaAgent } from '@prisma/client'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { Agent } from '@/domain/agent/entities/agent.entity'

export class PrismaAgentMapper {
	static toDomain(raw: PrismaAgent): Agent {
		return Agent.create(
			{
				name: raw.name,
				email: raw.email,
				password: raw.password,
				status: raw.status,
				master: raw.master,
				isInRotation: raw.isInRotation,
				role: raw.role,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id),
		)
	}

	static toPrisma(agent: Agent): Prisma.UserUncheckedCreateInput {
		return {
			id: agent.id.toString(),
			name: agent.name,
			email: agent.email,
			password: agent.password,
			master: agent.master,
			status: agent.status,
			isInRotation: agent.isInRotation,
			role: agent.role,
			createdAt: agent.createdAt,
			updatedAt: agent.updatedAt,
		}
	}
}

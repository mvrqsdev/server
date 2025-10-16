import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { AgentRoles } from '@/domain/agent/entities/agent-roles.watched-list'
import { AgentStatusFactory } from '@/domain/agent/factories/agent-status.factory'
import { PrismaRoleMapper } from '../../role/mappers/role.prisma-mapper'

type AgentWithRolesAndPermissions = Prisma.UserGetPayload<{
	include: {
		Roles: {
			include: {
				Role: {
					include: {
						Permissions: {
							include: {
								Permission: true
							}
						}
					}
				}
			}
		}
	}
}>
@Injectable()
export class PrismaAgentMapper {
	constructor(
		private agentStatusFactory: AgentStatusFactory,
		private roleMapper: PrismaRoleMapper,
	) {}
	toDomain(raw: AgentWithRolesAndPermissions): Agent {
		const roles = new AgentRoles(
			raw.Roles.map((item) => this.roleMapper.toDomain(item.Role)),
		)
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
				roles,
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

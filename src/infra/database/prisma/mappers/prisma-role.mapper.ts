import { Prisma, Role as PrismaRole } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Agent } from '@/domain/real-state/enterprise/entities/agent.entity'
import { Permission } from '@/domain/roles/enterprise/entities/permission.entity'
import { Role } from '@/domain/roles/enterprise/entities/role.entity'
import { RoleAgentList } from '@/domain/roles/enterprise/entities/role-agents-list.entity'
import { RolePermissionsList } from '@/domain/roles/enterprise/entities/role-permissions-list.entity'

export class PrismaRoleMapper {
	static toDomain(raw: PrismaRole): Role {
		return Role.create(
			{
				name: raw.name,
				color: raw.color,
				description: raw.description,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id),
		)
	}

	static toDomainWithRelations(
		raw: PrismaRole,
		permissions: Permission[],
		agents: Agent[],
	): Role {
		return Role.create(
			{
				name: raw.name,
				color: raw.color,
				description: raw.description,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
				permissions: new RolePermissionsList(permissions),
				agents: new RoleAgentList(agents),
			},
			new UniqueEntityID(raw.id),
		)
	}

	static toPrisma(role: Role): Prisma.RoleUncheckedCreateInput {
		return {
			id: role.id.toString(),
			name: role.name,
			color: role.color,
			description: role.description,
			createdAt: role.createdAt,
			updatedAt: role.updatedAt,
		}
	}
}

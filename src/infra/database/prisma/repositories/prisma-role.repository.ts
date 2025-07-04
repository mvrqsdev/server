import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { RoleRepository } from '@/domain/roles/application/repositories/role.repository'
import { Role } from '@/domain/roles/enterprise/entities/role.entity'
import { PrismaAgentMapper } from '../mappers/prisma-agent.mapper'
import { PrismaPermissionMapper } from '../mappers/prisma-permission.mapper'
import { PrismaRoleMapper } from '../mappers/prisma-role.mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaRoleRepository implements RoleRepository {
	constructor(private prisma: PrismaService) {}
	async findManyByIds(ids: string[]): Promise<Role[]> {
		const roles = await this.prisma.role.findMany({
			where: {
				id: {
					in: ids,
				},
			},
		})

		return roles.map(PrismaRoleMapper.toDomain)
	}

	async findByIdWithDetails(id: string): Promise<Role | null> {
		const role = await this.prisma.role.findUnique({
			where: {
				id,
			},
		})

		if (!role) {
			return null
		}

		const rolePermissions = await this.prisma.rolePermission.findMany({
			where: { roleId: id },
		})
		const permissions = await this.prisma.permission.findMany({
			where: { id: { in: rolePermissions.map((rp) => rp.permissionId) } },
		})

		const roleAgents = await this.prisma.roleMember.findMany({ where: { roleId: id } })
		const agents = await this.prisma.user.findMany({
			where: { id: { in: roleAgents.map((ra) => ra.userId) } },
		})

		// mapear para domínio (supondo que você tenha os mappers)
		const domainPermissions = permissions.map(PrismaPermissionMapper.toDomain)
		const domainAgents = agents.map(PrismaAgentMapper.toDomain)

		return PrismaRoleMapper.toDomainWithRelations(role, domainPermissions, domainAgents)
	}

	async findById(id: string): Promise<Role | null> {
		const role = await this.prisma.role.findUnique({
			where: {
				id,
			},
		})

		if (!role) {
			return null
		}

		return PrismaRoleMapper.toDomain(role)
	}
	async findByName(name: string): Promise<Role | null> {
		const role = await this.prisma.role.findUnique({
			where: {
				name,
			},
		})

		if (!role) {
			return null
		}

		return PrismaRoleMapper.toDomain(role)
	}

	async create(role: Role): Promise<void> {
		const data = PrismaRoleMapper.toPrisma(role)
		await this.prisma.role.create({
			data,
		})

		const permissions = role.permissions.getItems()
		await this.prisma.rolePermission.createMany({
			data: permissions.map<Prisma.RolePermissionCreateManyInput>((permission) => ({
				roleId: role.id.toString(),
				permissionId: permission.id.toString(),
			})),
		})

		const agents = role.agents.getItems()

		await this.prisma.roleMember.createMany({
			data: agents.map<Prisma.RoleMemberCreateManyInput>((agent) => ({
				roleId: role.id.toString(),
				userId: agent.id.toString(),
			})),
		})
	}
	async save(role: Role): Promise<void> {
		const data = PrismaRoleMapper.toPrisma(role)
		const newAgents = role.agents.getNewItems()
		const removedAgents = role.agents.getRemovedItems()

		const newPermissions = role.permissions.getNewItems()
		const removedPermissions = role.permissions.getRemovedItems()

		await Promise.all([
			this.prisma.role.update({
				where: {
					id: role.id.toString(),
				},
				data,
			}),
			this.prisma.roleMember.createMany({
				data: newAgents.map<Prisma.RoleMemberCreateManyInput>((agent) => ({
					roleId: role.id.toString(),
					userId: agent.id.toString(),
				})),
			}),
			this.prisma.roleMember.deleteMany({
				where: {
					roleId: role.id.toString(),
					userId: {
						in: removedAgents.map((agent) => agent.id.toString()),
					},
				},
			}),
			this.prisma.rolePermission.createMany({
				data: newPermissions.map<Prisma.RolePermissionCreateManyInput>((permission) => ({
					roleId: role.id.toString(),
					permissionId: permission.id.toString(),
				})),
			}),
			this.prisma.rolePermission.deleteMany({
				where: {
					roleId: role.id.toString(),
					permissionId: {
						in: removedPermissions.map((permission) => permission.id.toString()),
					},
				},
			}),
		])
	}

	async delete(role: Role): Promise<void> {
		const data = PrismaRoleMapper.toPrisma(role)
		await this.prisma.role.delete({
			where: {
				id: data.id,
			},
		})
	}
}

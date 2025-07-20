import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PermissionRepository } from '@/application/repositories/permission/permission.repository'
import { Permission } from '@/domain/permission/permission.entity'
import { Role } from '@/domain/role/entities/role.entity'
import { PrismaService } from '../../prisma.service'
import { PrismaPermissionMapper } from '../mappers/permission.prisma-mapper'

@Injectable()
export class PrismaPermissionRepository implements PermissionRepository {
	constructor(
		private prisma: PrismaService,
		private permissionMapper: PrismaPermissionMapper,
	) {}
	async findById(id: string): Promise<Permission | null> {
		const permission = await this.prisma.permission.findUnique({
			where: {
				id,
			},
		})

		if (!permission) {
			return null
		}

		return this.permissionMapper.toDomain(permission)
	}
	async findManyByIds(permissionIds: string[]): Promise<Permission[]> {
		const permissions = await this.prisma.permission.findMany({
			where: {
				id: {
					in: permissionIds,
				},
			},
		})
		return permissions.map((permission) => this.permissionMapper.toDomain(permission))
	}
	async findManyByRole(role: Role): Promise<Permission[]> {
		const permissions = await this.prisma.permission.findMany({
			where: {
				Roles: {
					some: {
						Role: {
							id: role.id.toString(),
						},
					},
				},
			},
		})
		return permissions.map((permission) => this.permissionMapper.toDomain(permission))
	}
	async addPermissionsToRole(role: Role, permissions: Permission[]): Promise<void> {
		if (permissions.length === 0) return

		const data: Prisma.RolePermissionCreateManyInput[] = permissions.map(
			(permission) => ({
				roleId: role.id.toString(),
				permissionId: permission.id.toString(),
			}),
		)

		await this.prisma.rolePermission.createMany({
			data,
		})
	}
	async removePermissionsFromRole(role: Role, permissions: Permission[]): Promise<void> {
		if (permissions.length === 0) return

		const where: Prisma.RolePermissionWhereInput = {
			roleId: role.id.toString(),
			permissionId: {
				in: permissions.map((permission) => permission.id.toString()),
			},
		}

		await this.prisma.rolePermission.deleteMany({ where })
	}
	async create(permission: Permission): Promise<void> {
		const data = this.permissionMapper.toPrisma(permission)
		await this.prisma.permission.create({ data })
	}
	async save(permission: Permission): Promise<void> {
		const data = this.permissionMapper.toPrisma(permission)
		await this.prisma.permission.update({
			where: {
				id: data.id,
			},
			data,
		})
	}
}

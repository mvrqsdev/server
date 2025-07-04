import { Injectable } from '@nestjs/common'
import { PermissionRepository } from '@/domain/roles/application/repositories/permission.repository'
import { Permission } from '@/domain/roles/enterprise/entities/permission.entity'
import { Slug } from '@/domain/roles/enterprise/entities/value-objects/slug'
import { PrismaPermissionMapper } from '../mappers/prisma-permission.mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaPermissionRepository implements PermissionRepository {
	constructor(private prisma: PrismaService) {}
	async findManyByIds(ids: string[]): Promise<Permission[]> {
		const permissions = await this.prisma.permission.findMany({
			where: {
				id: {
					in: ids,
				},
			},
		})

		return permissions.map(PrismaPermissionMapper.toDomain)
	}

	async findById(id: string): Promise<Permission | null> {
		const permission = await this.prisma.permission.findUnique({
			where: {
				id,
			},
		})

		if (!permission) {
			return null
		}

		return PrismaPermissionMapper.toDomain(permission)
	}

	async findBySlug(slug: Slug): Promise<Permission | null> {
		const permission = await this.prisma.permission.findUnique({
			where: {
				slug: slug.value,
			},
		})

		if (!permission) {
			return null
		}

		return PrismaPermissionMapper.toDomain(permission)
	}

	async findByRoleId(roleId: string): Promise<Permission[]> {
		const rolePermissions = await this.prisma.rolePermission.findMany({
			where: {
				roleId,
			},
		})

		const permissionIds = Array.from(
			new Set(rolePermissions.map((rp) => rp.permissionId)),
		)

		const permissions = await this.prisma.permission.findMany({
			where: {
				id: {
					in: permissionIds,
				},
			},
		})

		return permissions.map(PrismaPermissionMapper.toDomain)
	}

	async findMany(): Promise<Permission[]> {
		const permissions = await this.prisma.permission.findMany()
		return permissions.map(PrismaPermissionMapper.toDomain)
	}
}

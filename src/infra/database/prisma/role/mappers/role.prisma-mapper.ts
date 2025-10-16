import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { Slug } from '@/core/value-objects/slug'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { Role } from '@/domain/role/entities/role.entity'
import { RolePermissions } from '@/domain/role/entities/role-permissions.watched-list'
import { HexColor } from '@/domain/role/value-objects/hex-color.value-object'
import { PrismaPermissionMapper } from '../../permission/mappers/permission.prisma-mapper'

type RoleWithPermissions = Prisma.RoleGetPayload<{
	include: {
		Permissions: {
			include: {
				Permission: true
			}
		}
	}
}>
@Injectable()
export class PrismaRoleMapper {
	constructor(private permissionMapper: PrismaPermissionMapper) {}
	toDomain(raw: RoleWithPermissions): Role {
		const permissions = new RolePermissions(
			raw.Permissions.map((item) => this.permissionMapper.toDomain(item.Permission)),
		)

		return Role.create(
			{
				name: raw.name,
				color: HexColor.create(raw.color),
				description: raw.description,
				slug: Slug.create(raw.slug),
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
				permissions,
			},
			new UniqueEntityID(raw.id),
		)
	}

	toPrisma(role: Role): Prisma.RoleUncheckedCreateInput {
		return {
			id: role.id.toString(),
			name: role.name,
			color: role.color.toString(),
			slug: role.slug.value,
			createdAt: role.createdAt,
			updatedAt: role.updatedAt,
		}
	}
}

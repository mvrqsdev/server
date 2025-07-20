import { Injectable } from '@nestjs/common'
import { Prisma, Permission as PrismaPermission } from '@prisma/client'
import { Slug } from '@/core/value-objects/slug'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { Permission } from '@/domain/permission/permission.entity'

@Injectable()
export class PrismaPermissionMapper {
	toDomain(raw: PrismaPermission): Permission {
		return Permission.create(
			{
				name: raw.name,
				description: raw.description,
				slug: Slug.create(raw.slug),
			},
			new UniqueEntityID(raw.id),
		)
	}

	toPrisma(permission: Permission): Prisma.PermissionUncheckedCreateInput {
		return {
			id: permission.id.toString(),
			name: permission.name,
			description: permission.description,
			slug: permission.slug.value,
			createdAt: permission.createdAt,
			updatedAt: permission.updatedAt,
		}
	}
}

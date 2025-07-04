import { Prisma, Permission as PrismaPermission } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Permission } from '@/domain/roles/enterprise/entities/permission.entity'
import { Slug } from '@/domain/roles/enterprise/entities/value-objects/slug'

export class PrismaPermissionMapper {
	static toDomain(raw: PrismaPermission): Permission {
		return Permission.create(
			{
				name: raw.name,
				description: raw.description,
				slug: Slug.create(raw.slug),
			},
			new UniqueEntityID(raw.id),
		)
	}

	static toPrisma(permission: Permission): Prisma.PermissionUncheckedCreateInput {
		return {
			id: permission.id.toString(),
			name: permission.name,
			description: permission.description,
			slug: permission.slug.value,
		}
	}
}

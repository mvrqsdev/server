import { Injectable } from '@nestjs/common'
import { Prisma, Role as PrismaRole } from '@prisma/client'
import { Slug } from '@/core/value-objects/slug'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { Role } from '@/domain/role/entities/role.entity'
import { HexColor } from '@/domain/role/value-objects/hex-color.value-object'

@Injectable()
export class PrismaRoleMapper {
	toDomain(raw: PrismaRole): Role {
		return Role.create(
			{
				name: raw.name,
				color: HexColor.create(raw.color),
				description: raw.description,
				slug: Slug.create(raw.slug),
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
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

import { Prisma, Authentication as PrismaAuthentication } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Authentication } from '@/domain/real-state/enterprise/entities/authentication.entity'

export class PrismaAuthenticationMapper {
	static toDomain(raw: PrismaAuthentication): Authentication {
		return Authentication.create(
			{
				agentId: new UniqueEntityID(raw.agentId),
				strategy: raw.strategy,
				token: raw.token,
				ip: raw.ip,
				userAgent: raw.userAgent,
				expiresAt: raw.expiresAt,
				revokedAt: raw.revokedAt,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id),
		)
	}

	static toPrisma(
		authentication: Authentication,
	): Prisma.AuthenticationUncheckedCreateInput {
		return {
			id: authentication.id.toString(),
			agentId: authentication.agentId.toString(),
			strategy: authentication.strategy,
			token: authentication.token,
			ip: authentication.ip,
			userAgent: authentication.userAgent,
			expiresAt: authentication.expiresAt,
			revokedAt: authentication.revokedAt,
			createdAt: authentication.createdAt,
			updatedAt: authentication.updatedAt,
		}
	}
}

import { Prisma, Authentication as PrismaAuthentication } from '@prisma/client'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import {
	Authentication,
	AuthenticationStrategy,
} from '@/domain/authentication/entities/authentication.entity'
import { TokenValue } from '@/domain/authentication/value-objects/token-value'

export class PrismaAuthenticationMapper {
	static toDomain(raw: PrismaAuthentication): Authentication {
		return Authentication.create(
			{
				agentId: new UniqueEntityID(raw.agentId),
				strategy: raw.strategy as AuthenticationStrategy,
				token: new TokenValue(raw.token),
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
			token: authentication.token.toString(),
			ip: authentication.ip,
			userAgent: authentication.userAgent,
			expiresAt: authentication.expiresAt,
			revokedAt: authentication.revokedAt,
			createdAt: authentication.createdAt,
			updatedAt: authentication.updatedAt,
		}
	}
}

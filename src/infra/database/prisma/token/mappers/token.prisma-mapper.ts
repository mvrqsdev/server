import { Injectable } from '@nestjs/common'
import { Prisma, Token as PrismaToken } from '@prisma/client'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { Token } from '@/domain/token/entities/token.entity'
import { TokenValue } from '@/domain/token/value-objects/token-value.value-object'

@Injectable()
export class PrismaTokenMapper {
	toDomain(raw: PrismaToken): Token {
		return Token.create(
			{
				token: new TokenValue(raw.token),
				agentId: new UniqueEntityID(raw.agentId),
				expiresAt: raw.expiresAt,
				type: raw.type,
				createdAt: raw.createdAt,
				usedAt: raw.usedAt,
			},
			new UniqueEntityID(raw.id),
		)
	}

	toPrisma(token: Token): Prisma.TokenUncheckedCreateInput {
		return {
			id: token.id.toString(),
			agentId: token.agentId.toString(),
			token: token.token.toHash(),
			expiresAt: token.expiresAt,
			type: token.type,
			createdAt: token.createdAt,
			usedAt: token.usedAt,
		}
	}
}

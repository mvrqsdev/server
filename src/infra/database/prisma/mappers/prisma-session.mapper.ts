import { Prisma, Session as PrismaSession } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Session } from '@/domain/authentication/enterprise/entities/session.entity'
import { Device } from '@/domain/authentication/enterprise/entities/value-objects/device'

export class PrismaSessionMapper {
	static toDomain(raw: PrismaSession): Session {
		return Session.create(
			{
				userId: new UniqueEntityID(raw.userId),
				device: new Device(raw.device),
				expires: raw.expires,
				revoked: raw.revoked,
				impersonatedBy: raw.impersonatedBy
					? new UniqueEntityID(raw.impersonatedBy)
					: null,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id),
		)
	}

	static toPrisma(session: Session): Prisma.SessionUncheckedCreateInput {
		return {
			id: session.id.toString(),
			userId: session.userId.toString(),
			device: session.device.toUserAgent(),
			revoked: session.isRevoked(),
			impersonatedBy: session.impersonator?.toString(),
			expires: session.expires,
			createdAt: session.createdAt,
			updatedAt: session.updatedAt,
		}
	}
}

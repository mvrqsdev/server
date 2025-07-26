import { Injectable } from '@nestjs/common'
import { Prisma, IAMessage as PrismaIAMessage } from '@prisma/client'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { IAMessage } from '@/domain/ia-message/entities/ia-message.entity'

@Injectable()
export class PrismaIAMessageMapper {
	toDomain(raw: PrismaIAMessage): IAMessage {
		return IAMessage.create(
			{
				leadId: new UniqueEntityID(raw.leadId),
				contactId: new UniqueEntityID(raw.contactId),
				content: raw.content,
				mediaUrl: raw.mediaUrl,
				mediaKey: raw.mediaKey,
				messageType: raw.messageType,
				fromBot: raw.fromBot,
				sessionId: raw.sessionId,
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id),
		)
	}

	toPrisma(iaMessage: IAMessage): Prisma.IAMessageUncheckedCreateInput {
		return {
			id: iaMessage.id.toString(),
			leadId: iaMessage.leadId.toString(),
			contactId: iaMessage.contactId.toString(),
			content: iaMessage.content,
			mediaUrl: iaMessage.mediaUrl,
			mediaKey: iaMessage.mediaKey,
			messageType: iaMessage.messageType,
			fromBot: iaMessage.fromBot,
			sessionId: iaMessage.sessionId,
			createdAt: iaMessage.createdAt,
			updatedAt: iaMessage.updatedAt,
		}
	}
}

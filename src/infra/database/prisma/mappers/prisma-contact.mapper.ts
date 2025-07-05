import { Prisma, Contact as PrismaContact } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Contact } from '@/domain/real-state/enterprise/entities/contact.entity'
import { WhatsappNumber } from '@/domain/real-state/enterprise/entities/value-objects/whatsapp-number.value-object'

export class PrismaContactMapper {
	static toDomain(raw: PrismaContact): Contact {
		return Contact.create(
			{
				name: raw.name,
				email: raw.email,
				whatsappNumber: WhatsappNumber.createFromText(raw.whatsappNumber),
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id),
		)
	}

	static toPrisma(contact: Contact): Prisma.ContactUncheckedCreateInput {
		return {
			id: contact.id.toString(),
			name: contact.name,
			email: contact.email,
			whatsappNumber: contact.whatsappNumber.whatsappId,
			createdAt: contact.createdAt,
			updatedAt: contact.updatedAt,
		}
	}
}

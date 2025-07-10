import { Prisma, Contact as PrismaContact } from '@prisma/client'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { WhatsappNumber } from '@/core/value-objects/whatsapp-number.value-object'
import { Contact } from '@/domain/contact/entities/contact.entity'

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

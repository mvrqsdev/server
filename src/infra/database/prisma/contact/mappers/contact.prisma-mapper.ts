import { Injectable } from '@nestjs/common'
import { Prisma, Contact as PrismaContact } from '@prisma/client'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { WhatsappNumber } from '@/core/value-objects/whatsapp-number.value-object'
import { Contact } from '@/domain/contact/entities/contact.entity'

@Injectable()
export class PrismaContactMapper {
	toDomain(raw: PrismaContact): Contact {
		return Contact.create(
			{
				name: raw.name,
				email: raw.email,
				number: WhatsappNumber.createFromText(raw.number),
				createdAt: raw.createdAt,
				updatedAt: raw.updatedAt,
			},
			new UniqueEntityID(raw.id),
		)
	}

	toPrisma(contact: Contact): Prisma.ContactUncheckedCreateInput {
		return {
			id: contact.id.toString(),
			name: contact.name,
			email: contact.email,
			number: contact.number.whatsappId,
			createdAt: contact.createdAt,
			updatedAt: contact.updatedAt,
		}
	}
}

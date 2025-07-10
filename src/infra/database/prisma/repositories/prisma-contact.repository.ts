import { Injectable } from '@nestjs/common'
import { ContactRepository } from '@/application/repositories/contact/contact.repository'
import { Contact } from '@/domain/contact/entities/contact.entity'
import { PrismaContactMapper } from '../mappers/prisma-contact.mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaContactRepository implements ContactRepository {
	constructor(private prisma: PrismaService) {}
	async findById(id: string): Promise<Contact | null> {
		const contact = await this.prisma.contact.findUnique({
			where: {
				id,
			},
		})

		if (!contact) {
			return null
		}

		return PrismaContactMapper.toDomain(contact)
	}

	async findByWhatsappNumber(whatsappNumber: string): Promise<Contact | null> {
		const contact = await this.prisma.contact.findUnique({
			where: {
				whatsappNumber,
			},
		})

		if (!contact) {
			return null
		}

		return PrismaContactMapper.toDomain(contact)
	}

	async create(contact: Contact): Promise<void> {
		const data = PrismaContactMapper.toPrisma(contact)
		await this.prisma.contact.create({ data })
	}

	async save(contact: Contact): Promise<void> {
		const data = PrismaContactMapper.toPrisma(contact)
		await this.prisma.contact.update({
			where: {
				id: data.id,
			},
			data,
		})
	}
}

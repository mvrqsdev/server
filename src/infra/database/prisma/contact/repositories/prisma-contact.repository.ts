import { Injectable } from '@nestjs/common'
import { ContactRepository } from '@/application/repositories/contact.repository'
import { Contact } from '@/domain/contact/entities/contact.entity'
import { PrismaService } from '../../prisma.service'
import { PrismaContactMapper } from '../mappers/contact.prisma-mapper'

@Injectable()
export class PrismaContactRepository implements ContactRepository {
	constructor(
		private prisma: PrismaService,
		private contactMapper: PrismaContactMapper,
	) {}
	async findById(id: string): Promise<Contact | null> {
		const contact = await this.prisma.contact.findUnique({
			where: {
				id,
			},
		})

		if (!contact) return null

		return this.contactMapper.toDomain(contact)
	}
	async findByNumber(number: string): Promise<Contact | null> {
		const contact = await this.prisma.contact.findUnique({
			where: {
				number,
			},
		})

		if (!contact) return null

		return this.contactMapper.toDomain(contact)
	}

	async create(contact: Contact): Promise<void> {
		const data = this.contactMapper.toPrisma(contact)
		await this.prisma.contact.create({ data })
	}
	async save(contact: Contact): Promise<void> {
		const data = this.contactMapper.toPrisma(contact)
		await this.prisma.contact.update({
			where: {
				id: data.id,
			},
			data,
		})
	}
}

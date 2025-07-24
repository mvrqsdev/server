import { Injectable } from '@nestjs/common'
import { ContactRepository } from '@/application/repositories/contact.repository'
import { Contact } from '@/domain/contact/entities/contact.entity'
import { PrismaService } from '../../prisma.service'
import { PrismaContactMapper } from '../mappers/contact.prisma-mapper'

@Injectable()
export class PrismaContactRepository implements ContactRepository {
	constructor(private prisma: PrismaService) {}

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

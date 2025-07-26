import { Injectable } from '@nestjs/common'
import { IAMessageRepository } from '@/application/repositories/ia-message.repository'
import { IAMessage } from '@/domain/ia-message/entities/ia-message.entity'
import { PrismaService } from '../../prisma.service'
import { PrismaIAMessageMapper } from '../mapper/ia-message.prisma-mapper'

@Injectable()
export class PrismaIAMessageRepository implements IAMessageRepository {
	constructor(
		private prisma: PrismaService,
		private iaMessageMapper: PrismaIAMessageMapper,
	) {}
	async findById(id: string): Promise<IAMessage | null> {
		const iaMessage = await this.prisma.iAMessage.findUnique({
			where: {
				id,
			},
		})

		if (!iaMessage) return null

		return this.iaMessageMapper.toDomain(iaMessage)
	}
	async findManyByLeadId(leadId: string): Promise<IAMessage[]> {
		const iaMessages = await this.prisma.iAMessage.findMany({
			where: {
				leadId,
			},
		})

		return iaMessages.map((iaMessage) => this.iaMessageMapper.toDomain(iaMessage))
	}
	async create(iaMessage: IAMessage): Promise<void> {
		const data = this.iaMessageMapper.toPrisma(iaMessage)
		await this.prisma.iAMessage.create({ data })
	}
	async save(iaMessage: IAMessage): Promise<void> {
		const data = this.iaMessageMapper.toPrisma(iaMessage)
		await this.prisma.iAMessage.update({
			where: {
				id: data.id,
			},
			data,
		})
	}
}

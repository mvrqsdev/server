import { Injectable } from '@nestjs/common'
import { ConnectionRepository } from '@/application/repositories/connection/connection.repository'
import { Connection } from '@/domain/connection/entities/connection.entity'
import { PrismaService } from '../../prisma.service'
import { PrismaConnectionMapper } from '../mappers/connection.prisma-mapper'
@Injectable()
export class PrismaConnectionRepository implements ConnectionRepository {
	constructor(
		private prisma: PrismaService,
		private connectionMapper: PrismaConnectionMapper,
	) {}

	async create(connection: Connection): Promise<void> {
		const data = this.connectionMapper.toPrisma(connection)
		await this.prisma.connection.create({ data })
	}

	async save(connection: Connection): Promise<void> {
		const data = this.connectionMapper.toPrisma(connection)
		await this.prisma.connection.update({
			where: {
				id: data.id,
			},
			data,
		})
	}
}

import { Injectable } from '@nestjs/common'
import { ConnectionRepository } from '@/application/repositories/connection/connection.repository'
import { Connection } from '@/domain/connection/entities/connection.entity'
import { PrismaConnectionMapper } from '../mappers/prisma-connection.mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaConnectionRepository implements ConnectionRepository {
	constructor(private prisma: PrismaService) {}
	async findByNumber(number: string): Promise<Connection | null> {
		const connection = await this.prisma.connection.findUnique({
			where: {
				number,
			},
		})

		if (!connection) {
			return null
		}

		return PrismaConnectionMapper.toDomain(connection)
	}
	async findPrincipal(): Promise<Connection | null> {
		const principal = await this.prisma.connection.findFirst({
			where: {
				principal: true,
			},
		})

		if (!principal) {
			return null
		}

		return PrismaConnectionMapper.toDomain(principal)
	}
	async delete(connection: Connection): Promise<void> {
		const data = PrismaConnectionMapper.toPrisma(connection)
		await this.prisma.connection.delete({
			where: {
				id: data.id,
			},
		})
	}
	async findById(id: string): Promise<Connection | null> {
		const connection = await this.prisma.connection.findUnique({
			where: {
				id,
			},
		})

		if (!connection) {
			return null
		}

		return PrismaConnectionMapper.toDomain(connection)
	}
	async findByAgentId(id: string): Promise<Connection[]> {
		const connection = await this.prisma.connection.findMany({
			where: {
				agentId: id,
			},
		})

		return connection.map(PrismaConnectionMapper.toDomain)
	}

	async create(connection: Connection): Promise<void> {
		const data = PrismaConnectionMapper.toPrisma(connection)
		await this.prisma.connection.create({ data })
	}

	async save(connection: Connection): Promise<void> {
		const data = PrismaConnectionMapper.toPrisma(connection)
		await this.prisma.connection.update({
			where: {
				id: data.id,
			},
			data,
		})
	}
}

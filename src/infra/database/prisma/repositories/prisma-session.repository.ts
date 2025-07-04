import { Injectable } from '@nestjs/common'
import { SessionRepository } from '@/domain/authentication/application/repositories/session.repository'
import { Session } from '@/domain/authentication/enterprise/entities/session.entity'
import { PrismaSessionMapper } from '../mappers/prisma-session.mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaSessionRepository implements SessionRepository {
	constructor(private prisma: PrismaService) {}

	async findById(id: string): Promise<Session | null> {
		const session = await this.prisma.session.findUnique({
			where: {
				id,
			},
		})

		if (!session) {
			return null
		}

		return PrismaSessionMapper.toDomain(session)
	}

	async findManyByUserId(userId: string): Promise<Session[]> {
		const sessions = await this.prisma.session.findMany({
			where: {
				userId,
			},
		})

		return sessions.map(PrismaSessionMapper.toDomain)
	}
	async create(session: Session): Promise<void> {
		const data = PrismaSessionMapper.toPrisma(session)

		await this.prisma.session.create({ data })
	}

	async save(session: Session): Promise<void> {
		const data = PrismaSessionMapper.toPrisma(session)

		await this.prisma.session.update({
			where: {
				id: data.id,
			},
			data,
		})
	}
}

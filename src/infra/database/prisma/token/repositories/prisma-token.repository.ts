import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { TokenRepository } from '@/application/repositories/token.repository'
import { FindAllTokensByFiltersRequest } from '@/application/use-cases/token/find-all-tokens-by-filters.use-case'
import { DomainEvents } from '@/core/events/domain-events'
import { clock } from '@/core/helpers/dayjs'
import { Token } from '@/domain/token/entities/token.entity'
import { PrismaService } from '../../prisma.service'
import { PrismaTokenMapper } from '../mappers/token.prisma-mapper'

@Injectable()
export class PrismaTokenRepository implements TokenRepository {
	constructor(
		private prisma: PrismaService,
		private tokenMapper: PrismaTokenMapper,
	) {}
	async findByFilters({
		agentId,
		expired,
		used,
		type,
		field = 'createdAt',
		direction = 'desc',
	}: FindAllTokensByFiltersRequest): Promise<Token[]> {
		const where: Prisma.TokenWhereInput = {}

		if (agentId) {
			where.agentId = agentId
		}

		if (type) {
			where.type = type
		}

		if (typeof used === 'boolean') {
			where.usedAt = used ? { not: null } : null
		}

		if (typeof expired === 'boolean') {
			const now = clock().toDate()
			where.expiresAt = expired ? { lt: now } : { gte: now }
		}

		const orderBy: Prisma.TokenOrderByWithRelationInput = {
			[field]: direction,
		}

		const tokens = await this.prisma.token.findMany({
			where,
			orderBy,
		})

		return tokens.map((token) => this.tokenMapper.toDomain(token))
	}
	async findById(id: string): Promise<Token | null> {
		const token = await this.prisma.token.findUnique({
			where: {
				id,
			},
		})

		if (!token) {
			return null
		}

		return this.tokenMapper.toDomain(token)
	}
	async create(token: Token): Promise<void> {
		const data = this.tokenMapper.toPrisma(token)
		await this.prisma.token.create({ data })
		DomainEvents.dispatchEventsForAggregate(token.id)
	}
	async save(token: Token): Promise<void> {
		const data = this.tokenMapper.toPrisma(token)
		await this.prisma.token.update({
			where: {
				id: data.id,
			},
			data,
		})
		DomainEvents.dispatchEventsForAggregate(token.id)
	}
	async findByToken(value: string): Promise<Token | null> {
		const token = await this.prisma.token.findUnique({
			where: {
				token: value,
			},
		})

		if (!token) {
			return null
		}

		return this.tokenMapper.toDomain(token)
	}
}

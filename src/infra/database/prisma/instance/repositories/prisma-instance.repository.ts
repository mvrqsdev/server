import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ManyInstancesFilter } from '@/application/facades/instance/interface'
import { InstanceRepository } from '@/application/repositories/instance.repository'
import { DomainEvents } from '@/core/events/domain-events'
import { Instance } from '@/domain/instance/entities/instance.entity'
import { PrismaService } from '../../prisma.service'
import { PrismaInstanceMapper } from '../mappers/instance.prisma-mapper'

@Injectable()
export class PrismaInstanceRepository implements InstanceRepository {
	constructor(
		private prisma: PrismaService,
		private instanceMapper: PrismaInstanceMapper,
	) {}
	async findManyByFilters({
		name,
		agentIds,
		connections,
		start_created_at,
		end_created_at,
		profileName,
	}: ManyInstancesFilter): Promise<Instance[]> {
		const where: Prisma.InstanceWhereInput = {}

		if (name) {
			where.name = {
				contains: name,
				mode: 'insensitive',
			}
		}

		if (agentIds && agentIds.length > 0) {
			where.agentId = {
				in: agentIds,
			}
		}

		if (connections && connections.length > 0) {
			where.connection = {
				in: connections,
			}
		}

		if (start_created_at || end_created_at) {
			where.createdAt = {
				...(start_created_at ? { gte: start_created_at } : undefined),
				...(end_created_at ? { lte: end_created_at } : undefined),
			}
		}

		if (profileName) {
			where.profileName = {
				contains: profileName,
				mode: 'insensitive',
			}
		}

		const instances = await this.prisma.instance.findMany({
			where,
		})

		return instances.map((instance) => this.instanceMapper.toDomain(instance))
	}
	async findById(id: string): Promise<Instance | null> {
		const instance = await this.prisma.instance.findUnique({
			where: {
				id,
			},
		})

		if (!instance) {
			return null
		}

		return this.instanceMapper.toDomain(instance)
	}
	async create(instance: Instance): Promise<void> {
		const data = this.instanceMapper.toPrisma(instance)
		await this.prisma.instance.create({ data })
		DomainEvents.dispatchEventsForAggregate(instance.id)
	}
	async save(instance: Instance): Promise<void> {
		const data = this.instanceMapper.toPrisma(instance)
		await this.prisma.instance.update({
			where: {
				id: data.id,
			},
			data,
		})
		DomainEvents.dispatchEventsForAggregate(instance.id)
	}
}

import { Injectable } from '@nestjs/common'
import { AuthenticationRepository } from '@/domain/real-state/application/repositories/authentication.repository'
import { Authentication } from '@/domain/real-state/enterprise/entities/authentication.entity'
import { EnvService } from '@/infra/env/env.service'
import { PrismaAuthenticationMapper } from '../mappers/prisma-authentication.mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaAuthenticationRepository implements AuthenticationRepository {
	constructor(
		private prisma: PrismaService,
		private envService: EnvService,
	) {}

	async findById(id: string): Promise<Authentication | null> {
		const authentication = await this.prisma.authentication.findUnique({
			where: {
				id,
			},
		})

		if (!authentication) {
			return null
		}

		return PrismaAuthenticationMapper.toDomain(authentication)
	}

	async findByToken(token: string): Promise<Authentication | null> {
		const authentication = await this.prisma.authentication.findUnique({
			where: {
				token,
			},
		})

		if (!authentication) {
			return null
		}

		return PrismaAuthenticationMapper.toDomain(authentication)
	}
	async updateAuthenticationExpiration(
		authentication: Authentication,
	): Promise<Authentication> {
		const expirationDays = this.envService.get('AUTH_EXPIRATION_DAYS')
		const newExpirationDate = new Date()
		newExpirationDate.setDate(newExpirationDate.getDate() + expirationDays)

		const data = PrismaAuthenticationMapper.toPrisma(authentication)
		const updatedAuthentication = await this.prisma.authentication.update({
			where: {
				id: data.id,
			},
			data: {
				expiresAt: newExpirationDate,
			},
		})

		return PrismaAuthenticationMapper.toDomain(updatedAuthentication)
	}
	async revokeAuthenticationExpiration(authentication: Authentication): Promise<void> {
		const data = PrismaAuthenticationMapper.toPrisma(authentication)
		await this.prisma.authentication.update({
			where: {
				id: data.id,
			},
			data: {
				revokedAt: new Date(),
			},
		})
	}
	async create(authentication: Authentication): Promise<void> {
		const data = PrismaAuthenticationMapper.toPrisma(authentication)
		await this.prisma.authentication.create({ data })
	}
	async save(authentication: Authentication): Promise<void> {
		const data = PrismaAuthenticationMapper.toPrisma(authentication)
		await this.prisma.authentication.update({
			where: {
				id: data.id,
			},
			data,
		})
	}
}

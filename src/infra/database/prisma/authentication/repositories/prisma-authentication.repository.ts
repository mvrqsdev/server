import { Injectable } from '@nestjs/common'
import { AuthenticationRepository } from '@/application/repositories/authentication.repository'
import { Authentication } from '@/domain/authentication/entities/authentication.entity'
import { PrismaService } from '../../prisma.service'
import { PrismaAuthenticationMapper } from '../mappers/authentication.prisma-mapper'

@Injectable()
export class PrismaAuthenticationRepository implements AuthenticationRepository {
	constructor(
		private authenticationMapper: PrismaAuthenticationMapper,
		private prisma: PrismaService,
	) {}
	async getByToken(token: string): Promise<Authentication | null> {
		const authentication = await this.prisma.authentication.findUnique({
			where: { token },
		})

		if (!authentication) {
			return null
		}

		return this.authenticationMapper.toDomain(authentication)
	}
	async create(authentication: Authentication): Promise<void> {
		const data = await this.authenticationMapper.toPrisma(authentication)
		await this.prisma.authentication.create({ data })
	}
	async save(authentication: Authentication): Promise<void> {
		const data = await this.authenticationMapper.toPrisma(authentication)
		await this.prisma.authentication.update({
			where: {
				id: data.id,
			},
			data,
		})
	}
}

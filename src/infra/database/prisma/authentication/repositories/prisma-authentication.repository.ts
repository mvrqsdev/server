import { Injectable } from '@nestjs/common'
import { AuthenticationRepository } from '@/application/repositories/authentication/authentication.repository'
import { Authentication } from '@/domain/authentication/entities/authentication.entity'

@Injectable()
export class PrismaAuthenticationRepository implements AuthenticationRepository {
	getByToken(token: string): Promise<Authentication | null> {
		throw new Error('Method not implemented.')
	}
	async create(authentication: Authentication): Promise<void> {
		throw new Error('Method not implemented.')
	}
	async save(authentication: Authentication): Promise<void> {
		throw new Error('Method not implemented.')
	}
}

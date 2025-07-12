import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'
import { Encrypter } from '@/application/cryptography/encrypter'
import { FailedToEncryptError } from '@/application/cryptography/errors/failed-to-encrypt.error'
import { AgentRepository } from '@/application/repositories/agents/agent.repository'
import { AuthenticationRepository } from '@/application/repositories/authentication/authentication.repository'
import { Either, left, right } from '@/core/either'
import { IEnvService } from '@/core/repositories/env-service.interface'
import { Authentication } from '@/domain/authentication/entities/authentication.entity'
import { AgentIsInactiveError } from '../agents/errors/agent-is-inactive.error'
import { AgentNotFoundError } from '../agents/errors/agent-not-found.error'

export interface CreateAuthenticationUseCaseRequest {
	strategy: 'ApiKey' | 'Session'
	agentId: string
	ip?: string
	userAgent?: string
	expiresAt?: Date
	revokedAt?: Date
}

type CreateAuthenticationUseCaseResponse = Either<
	AgentNotFoundError | AgentIsInactiveError | FailedToEncryptError,
	{ token: string }
>

@Injectable()
export class CreateAuthenticationUseCase {
	constructor(
		private envService: IEnvService,
		private authenticationRepository: AuthenticationRepository,
		private agentRepository: AgentRepository,
		private encrypter: Encrypter,
	) {}

	async execute({
		strategy,
		agentId,
		ip,
		userAgent,
		expiresAt,
		revokedAt,
	}: CreateAuthenticationUseCaseRequest): Promise<CreateAuthenticationUseCaseResponse> {
		const agent = await this.agentRepository.findById(agentId)

		if (!agent) {
			return left(new AgentNotFoundError())
		}

		if (agent.status === 'Inactive') {
			return left(new AgentIsInactiveError())
		}
		const token = strategy === 'ApiKey' ? `sk_${v4()}` : v4()
		const expirationDays = this.envService.get('AUTH_EXPIRATION_DAYS')
		const newExpirationDate = new Date()
		newExpirationDate.setDate(newExpirationDate.getDate() + expirationDays)

		const authentication = Authentication.create({
			strategy,
			token,
			agentId: agent.id,
			ip,
			userAgent,
			expiresAt: strategy === 'ApiKey' ? expiresAt : newExpirationDate,
			revokedAt,
		})

		await this.authenticationRepository.create(authentication)

		const encryptedToken = await this.encrypter.encrypt(token)

		if (!encryptedToken) {
			return left(new FailedToEncryptError())
		}

		return right({ token: encryptedToken })
	}
}

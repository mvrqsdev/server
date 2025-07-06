import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'
import { Either, left, right } from '@/core/either'
import { Authentication } from '../../enterprise/entities/authentication.entity'
import { Encrypter } from '../cryptography/encrypter'
import { AgentRepository } from '../repositories/agent.repository'
import { AuthenticationRepository } from '../repositories/authentication.repository'
import { AgentIsInactiveError } from './errors/agent-is-inactive.error'
import { AgentNotFoundError } from './errors/agent-not-found.error'
import { FailedToEncryptError } from './errors/failed-to-encrypt.error'

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

		const authentication = Authentication.create({
			strategy,
			token,
			agentId: agent.id,
			ip,
			userAgent,
			expiresAt,
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

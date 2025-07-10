import { Injectable } from '@nestjs/common'
import { Decrypter } from '@/application/cryptography/decrypter'
import { FailedToDecryptError } from '@/application/cryptography/errors/failed-to-decrypt.error'
import { AgentRepository } from '@/application/repositories/agents/agent.repository'
import { AuthenticationRepository } from '@/application/repositories/authentication/authentication.repository'
import { Either, left, right } from '@/core/either'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { Authentication } from '@/domain/authentication/entities/authentication.entity'
import { AgentNotFoundError } from '../agents/errors/agent-not-found.error'
import { AuthenticationNotFoundError } from './errors/authentication-not-found.error'

export interface GetAuthenticationAndAgentByTokenUseCaseRequest {
	token: string
}

type GetAuthenticationAndAgentByTokenUseCaseResponse = Either<
	AgentNotFoundError | AuthenticationNotFoundError | FailedToDecryptError,
	{ agent: Agent; authentication: Authentication }
>
@Injectable()
export class GetAuthenticationAndAgentByTokenUseCase {
	constructor(
		private authenticationRepository: AuthenticationRepository,
		private agentRepository: AgentRepository,
		private decrypter: Decrypter,
	) {}

	async execute({
		token,
	}: GetAuthenticationAndAgentByTokenUseCaseRequest): Promise<GetAuthenticationAndAgentByTokenUseCaseResponse> {
		const decryptedToken = await this.decrypter.decrypt(token)

		if (!decryptedToken) {
			return left(new FailedToDecryptError())
		}

		const authentication = await this.authenticationRepository.findByToken(decryptedToken)

		if (!authentication) {
			return left(new AuthenticationNotFoundError())
		}

		const agent = await this.agentRepository.findById(authentication.agentId.toString())

		if (!agent) {
			return left(new AgentNotFoundError())
		}

		return right({
			agent,
			authentication,
		})
	}
}

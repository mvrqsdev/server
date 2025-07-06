import { Injectable } from '@nestjs/common'
import { Either, left, right } from '@/core/either'
import { Agent } from '../../enterprise/entities/agent.entity'
import { Authentication } from '../../enterprise/entities/authentication.entity'
import { Decrypter } from '../cryptography/decrypter'
import { AgentRepository } from '../repositories/agent.repository'
import { AuthenticationRepository } from '../repositories/authentication.repository'
import { AgentNotFoundError } from './errors/agent-not-found.error'
import { AuthenticationNotFoundError } from './errors/authentication-not-found.error'
import { FailedToDecryptError } from './errors/failed-to-decrypt.error'

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

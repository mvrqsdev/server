import { Injectable } from '@nestjs/common'
import { AuthenticationRepository } from '@/application/repositories/authentication.repository'
import { clock } from '@/core/helpers/dayjs'
import { IEnvService } from '@/core/repositories/env-service.interface'
import { BaseUseCase } from '@/core/use-cases/base-use-case'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { Authentication } from '@/domain/authentication/entities/authentication.entity'

interface CreateAuthenticationUseCaseRequest {
	agent: Agent
	strategy: 'ApiKey' | 'Session'
	ip?: string
	userAgent?: string
	expiresAt?: Date
}

interface CreateAuthenticationUseCaseResponse {
	authentication: Authentication
}

@Injectable()
export class CreateAuthenticationUseCase
	implements
		BaseUseCase<CreateAuthenticationUseCaseRequest, CreateAuthenticationUseCaseResponse>
{
	constructor(
		private authenticationRepository: AuthenticationRepository,
		private iEnvService: IEnvService,
	) {}
	async execute({
		agent,
		strategy,
		ip,
		userAgent,
		expiresAt,
	}: CreateAuthenticationUseCaseRequest): Promise<CreateAuthenticationUseCaseResponse> {
		const expirationDate = clock().toDate()
		expirationDate.setDate(
			expirationDate.getDate() + this.iEnvService.get('AUTH_EXPIRATION_DAYS'),
		)

		const authentication = Authentication.create({
			agentId: agent.id,
			strategy,
			ip,
			userAgent,
			expiresAt: strategy === 'Session' ? expirationDate : expiresAt,
		})

		await this.authenticationRepository.create(authentication)
		return {
			authentication,
		}
	}
}

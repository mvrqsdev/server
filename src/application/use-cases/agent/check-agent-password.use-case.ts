import { Injectable } from '@nestjs/common'
import { HashComparer } from '@/application/cryptography/hash-comparer'
import { AgentValidateStrategy } from '@/application/facades/agent/contract/agent-validate-strategy'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { InvalidCredentialsError } from './errors/invalid-credentials.error'

export interface CheckAgentPasswordUseCaseRequest {
	agent: Agent
	password: string
}

@Injectable()
export class CheckAgentPasswordUseCase
	implements AgentValidateStrategy<CheckAgentPasswordUseCaseRequest>
{
	constructor(private hashComparer: HashComparer) {}
	async execute({ agent, password }: CheckAgentPasswordUseCaseRequest): Promise<void> {
		const isValidPassword = await this.hashComparer.compare(password, agent.password)

		if (!isValidPassword) {
			throw new InvalidCredentialsError()
		}
	}
}

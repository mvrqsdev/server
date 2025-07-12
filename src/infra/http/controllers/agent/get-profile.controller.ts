import { BadRequestException, Controller, Get, HttpCode } from '@nestjs/common'
import { GetAgentByIdUseCase } from '@/application/use-cases/agents/get-agent.use-case'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { CurrentUser } from '@/infra/authentication/current-user.decorator'
import { AgentDetailsPresenter } from '../../presenters/agent/agent-details.presenter'

@Controller('/profile')
export class GetAgentProfileController {
	constructor(private getAgentById: GetAgentByIdUseCase) {}

	@Get()
	@HttpCode(200)
	async handle(@CurrentUser() currentAgent: Agent) {
		const result = await this.getAgentById.execute({
			agentId: currentAgent.id.toString(),
		})

		if (result.isLeft()) {
			throw new BadRequestException()
		}

		return { agent: AgentDetailsPresenter.toHTTP(result.value.agent) }
	}
}

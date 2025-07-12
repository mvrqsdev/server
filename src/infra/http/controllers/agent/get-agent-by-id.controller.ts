import { BadRequestException, Controller, Get, HttpCode, Param } from '@nestjs/common'
import { GetAgentByIdUseCase } from '@/application/use-cases/agents/get-agent.use-case'
import { Roles } from '@/infra/authorization/roles.decorator'
import { AgentDetailsPresenter } from '../../presenters/agent/agent-details.presenter'

@Controller('/agents/:agentId')
export class GetAgentByIdController {
	constructor(private getAgentById: GetAgentByIdUseCase) {}

	@Get()
	@Roles('Admin')
	@HttpCode(200)
	async handle(@Param('agentId') agentId: string) {
		const result = await this.getAgentById.execute({
			agentId,
		})

		if (result.isLeft()) {
			throw new BadRequestException()
		}

		return { agent: AgentDetailsPresenter.toHTTP(result.value.agent) }
	}
}

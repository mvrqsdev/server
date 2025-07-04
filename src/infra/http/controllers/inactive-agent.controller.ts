import { BadRequestException, Controller, Delete, HttpCode, Param } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { InactiveAgentUseCase } from '@/domain/real-state/application/use-cases/inactive-agent.use-case'

@Controller('/agents/:id')
export class InactiveAgentController {
	constructor(private inactiveAgent: InactiveAgentUseCase) {}

	@Delete()
	@ApiOperation({
		operationId: 'deleteAgent',
		summary: 'Delete Agent',
		description: 'Delete a agent in the system.',
		tags: ['Agents'],
	})
	@HttpCode(204)
	async handle(@Param('id') id: string) {
		const result = await this.inactiveAgent.execute({ agentId: id })

		if (result.isLeft()) {
			throw new BadRequestException()
		}
	}
}

import {
	BadRequestException,
	Body,
	ConflictException,
	Controller,
	HttpCode,
	Put,
} from '@nestjs/common'
import { createZodDto, UseZodGuard } from 'nestjs-zod'
import { z } from 'zod'
import { AgentAlreadyExistsError } from '@/application/use-cases/agents/errors/agent-already-exists.error'
import { UpdateAgentUseCase } from '@/application/use-cases/agents/update-agent.use-case'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { CurrentUser } from '@/infra/authentication/current-user.decorator'

const updateAgentProfileBodySchema = z.object({
	name: z.string().describe('Nome do Agente no Sistema.'),
	email: z.string().describe('Nome de usuário no sistema'),
	password: z.string(),
})

type UpdateAgentProfileBodySchema = z.infer<typeof updateAgentProfileBodySchema>

export class UpdateAgentProfileDTO extends createZodDto(updateAgentProfileBodySchema) {}

@Controller('/profile')
export class UpdateAgentProfileController {
	constructor(private updateAgentProfile: UpdateAgentUseCase) {}

	@Put()
	@UseZodGuard('body', updateAgentProfileBodySchema)
	@HttpCode(204)
	async handle(
		@Body() body: UpdateAgentProfileBodySchema,
		@CurrentUser() currentAgent: Agent,
	) {
		const { name, email, password } = body
		const result = await this.updateAgentProfile.execute({
			agentId: currentAgent.id.toString(),
			name,
			email,
			password,
		})

		if (result.isLeft()) {
			const error = result.value

			switch (error.constructor) {
				case AgentAlreadyExistsError:
					throw new ConflictException(error.message)
				default:
					throw new BadRequestException(error.message)
			}
		}
	}
}

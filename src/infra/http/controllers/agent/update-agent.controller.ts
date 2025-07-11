import {
	BadRequestException,
	Body,
	ConflictException,
	Controller,
	HttpCode,
	Param,
	Put,
} from '@nestjs/common'
import { createZodDto, UseZodGuard } from 'nestjs-zod'
import { z } from 'zod'
import { AgentAlreadyExistsError } from '@/application/use-cases/agents/errors/agent-already-exists.error'
import { UpdateAgentUseCase } from '@/application/use-cases/agents/update-agent.use-case'

const updateAgentBodySchema = z.object({
	name: z.string().describe('Nome do Agente no Sistema.'),
	email: z.string().describe('Nome de usuário no sistema'),
	role: z.enum(['Admin', 'Marketing', 'Agent']),
	isInRotation: z.boolean().optional().default(false),
	master: z.boolean().optional().default(false),
	status: z.enum(['Active', 'Inactive']),
})

type UpdateAgentBodySchema = z.infer<typeof updateAgentBodySchema>

export class UpdateAgentDTO extends createZodDto(updateAgentBodySchema) {}

@Controller('/agents/:id')
export class UpdateAgentController {
	constructor(private updateAgent: UpdateAgentUseCase) {}

	@Put()
	@UseZodGuard('body', updateAgentBodySchema)
	@HttpCode(204)
	async handle(@Body() body: UpdateAgentBodySchema, @Param('id') id: string) {
		const { name, email, role, master, isInRotation, status } = body
		const result = await this.updateAgent.execute({
			agentId: id,
			name,
			email,
			role,
			isInRotation,
			master,
			status,
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

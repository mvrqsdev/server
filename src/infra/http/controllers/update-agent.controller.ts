import {
	BadRequestException,
	Body,
	ConflictException,
	Controller,
	HttpCode,
	Param,
	Put,
} from '@nestjs/common'
import { ApiBody, ApiOperation } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'
import { AgentAlreadyExistsError } from '@/domain/real-state/application/use-cases/errors/agent-already-exists.error'
import { UpdateAgentUseCase } from '@/domain/real-state/application/use-cases/update-agent.use-case'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'

const updateAgentBodySchema = z.object({
	name: z.string().describe('Nome do Agente no Sistema.'),
	email: z.string().describe('Nome de usuário no sistema'),
	password: z.string(),
	role: z.enum(['Admin', 'Marketing', 'Agent']),
	isInRotation: z.boolean().optional().default(false),
	master: z.boolean().optional().default(false),
	status: z.enum(['Active', 'Inactive']),
})

type UpdateAgentBodySchema = z.infer<typeof updateAgentBodySchema>

const bodyValidationPipe = new ZodValidationPipe(updateAgentBodySchema)

export class UpdateAgentDTO extends createZodDto(updateAgentBodySchema) {}

@Controller('/agents/:id')
export class UpdateAgentController {
	constructor(private updateAgent: UpdateAgentUseCase) {}

	@Put()
	@ApiOperation({
		operationId: 'updateAgent',
		summary: 'Update Agent',
		description: 'Update a agent in the system.',
		tags: ['Agents'],
	})
	@ApiBody({
		type: UpdateAgentDTO,
	})
	@HttpCode(204)
	async handle(
		@Body(bodyValidationPipe) body: UpdateAgentBodySchema,
		@Param('id') id: string,
	) {
		const { name, email, password, role, master, isInRotation, status } = body
		const result = await this.updateAgent.execute({
			agentId: id,
			name,
			email,
			password,
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

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
	name: z.string(),
	email: z.string(),
	password: z.string(),
	image: z.string().optional(),
	roles: z.array(z.string().cuid()).optional().default([]),
})

type UpdateAgentBodySchema = z.infer<typeof updateAgentBodySchema>

const bodyValidationPipe = new ZodValidationPipe(updateAgentBodySchema)

export class UpdateUserDTO extends createZodDto(updateAgentBodySchema) {}

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
		type: UpdateUserDTO,
	})
	@HttpCode(204)
	async handle(
		@Body(bodyValidationPipe) body: UpdateAgentBodySchema,
		@Param('id') id: string,
	) {
		const { name, email, password, roles, image } = body
		const result = await this.updateAgent.execute({
			agentId: id,
			name,
			email,
			password,
			image,
			roleIds: roles,
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

import {
	BadRequestException,
	Body,
	ConflictException,
	Controller,
	HttpCode,
	Post,
} from '@nestjs/common'
import { createZodDto, UseZodGuard } from 'nestjs-zod'
import { z } from 'zod'
import { CreateAgentUseCase } from '@/application/use-cases/agents/create-agent.use-case'
import { AgentAlreadyExistsError } from '@/application/use-cases/agents/errors/agent-already-exists.error'
import { Roles } from '@/infra/authorization/roles.decorator'

const createAgentBodySchema = z.object({
	name: z.string().describe('Nome do Agente no Sistema.'),
	email: z.string().describe('Nome de usuário no sistema'),
	password: z.string(),
	role: z.enum(['Admin', 'Marketing', 'Agent']),
	isInRotation: z.boolean().optional().default(false),
	master: z.boolean().optional().default(false),
})

type CreateAgentBodySchema = z.infer<typeof createAgentBodySchema>

export class CreateAgentDTO extends createZodDto(createAgentBodySchema) {}

@Controller('/agents')
export class CreateAgentController {
	constructor(private createAgent: CreateAgentUseCase) {}

	@Post()
	@UseZodGuard('body', createAgentBodySchema)
	@HttpCode(201)
	async handle(@Body() body: CreateAgentBodySchema) {
		const { name, email, password, isInRotation, master, role } = body

		const result = await this.createAgent.execute({
			name,
			email,
			password,
			isInRotation,
			role,
			master,
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

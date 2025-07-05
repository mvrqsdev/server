import {
	BadRequestException,
	Body,
	ConflictException,
	Controller,
	HttpCode,
	Post,
} from '@nestjs/common'
import {
	ApiBody,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiHeader,
	ApiOperation,
} from '@nestjs/swagger'
import { createZodDto, UseZodGuard } from 'nestjs-zod'
import { z } from 'zod'
import { CreateAgentUseCase } from '@/domain/real-state/application/use-cases/create-agent.use-case'
import { AgentAlreadyExistsError } from '@/domain/real-state/application/use-cases/errors/agent-already-exists.error'

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
	@ApiOperation({
		operationId: 'createAgent',
		summary: 'Create Agent',
		description: 'Create a agent with a basic data.',
		tags: ['Agents'],
	})
	@ApiBody({
		type: CreateAgentDTO,
		schema: {
			example: {
				name: 'João da Silva',
				email: 'joao@email.com',
				password: 'Senha@S3GUR4',
				image: 'img-do-upload.png',
				roles: ['id-da-role-1', 'id-da-role-2', 'id-da-role-3'],
			},
		},
	})
	@ApiCreatedResponse({
		description: 'Agente cadastrado com sucesso.',
	})
	@ApiHeader({
		name: 'Cookie',
		description: 'Session cookie no formato: sessionId={uuid}',
		example: 'sessionId=123e4567-e89b-12d3-a456-426614174000',
		required: true,
	})
	@ApiConflictResponse({
		description: 'Conflito nos dados informados.',
	})
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

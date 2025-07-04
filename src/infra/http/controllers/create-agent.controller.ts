import {
	BadRequestException,
	Body,
	ConflictException,
	Controller,
	HttpCode,
	Post,
} from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
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
import { OnAgentCreatedEvent } from '../events/on-agent-created.event'

const createAgentBodySchema = z.object({
	name: z.string().describe('Nome do Agente no Sistema.'),
	email: z.string().describe('Nome de usuário no sistema'),
	password: z.string(),
	image: z.string(),
	roles: z.array(z.string().cuid()).optional().default([]),
})

type CreateAgentBodySchema = z.infer<typeof createAgentBodySchema>

export class CreateUserDTO extends createZodDto(createAgentBodySchema) {}

@Controller('/agents')
export class CreateAgentController {
	constructor(
		private createAgent: CreateAgentUseCase,
		private eventEmitter: EventEmitter2,
	) {}

	@Post()
	@ApiOperation({
		operationId: 'createAgent',
		summary: 'Create Agent',
		description: 'Create a agent with a basic data.',
		tags: ['Agents'],
	})
	@ApiBody({
		type: CreateUserDTO,
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
		const { name, email, password, image, roles } = body

		const result = await this.createAgent.execute({
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

		const event = new OnAgentCreatedEvent()
		event.name = name
		event.message = `O Agente ${name} com email ${email} foi cadastrado com sucesso.`

		this.eventEmitter.emit('agent.created', event)
	}
}

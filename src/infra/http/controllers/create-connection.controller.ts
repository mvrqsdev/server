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
	ApiOperation,
} from '@nestjs/swagger'
import { createZodDto, UseZodGuard } from 'nestjs-zod'
import { z } from 'zod'
import { EvolutionInternalError } from '@/domain/real-state/application/integration/evolution/errors/EvolutionInternal.error'
import { CreateConnectionUseCase } from '@/domain/real-state/application/use-cases/create-connection.use-case'
import { AgentNotFoundError } from '@/domain/real-state/application/use-cases/errors/agent-not-found.error'
import { ConnectionAlreadyExistsError } from '@/domain/real-state/application/use-cases/errors/connection-already-exists.error'
import { ConnectionPresenter } from '../presenters/connection.presenter'

const createConnectionBodySchema = z.object({
	agentId: z.string().uuid(),
	whatsappNumber: z.string(),
})

type CreateConnectionBodySchema = z.infer<typeof createConnectionBodySchema>

export class CreateConnectionDTO extends createZodDto(createConnectionBodySchema) {}

@Controller('/connections')
export class CreateConnectionController {
	constructor(private createConnection: CreateConnectionUseCase) {}

	@Post()
	@ApiOperation({
		operationId: 'createConnection',
		summary: 'Create Connection',
		description: 'Create a connection with a basic data.',
		tags: ['Connections'],
	})
	@ApiBody({
		type: CreateConnectionDTO,
		schema: {
			example: {
				agentId: '36b8f9c8-3754-426f-9c06-23df79dd2461',
				whatsappNumber: '+5551999999999',
			},
		},
	})
	@ApiCreatedResponse({
		description: 'Conexão cadastrada com sucesso.',
	})
	@ApiConflictResponse({
		description: 'Conflito nos dados informados.',
	})
	@UseZodGuard('body', createConnectionBodySchema)
	@HttpCode(201)
	async handle(@Body() body: CreateConnectionBodySchema) {
		const { agentId, whatsappNumber } = body

		const result = await this.createConnection.execute({
			agentId,
			whatsappNumber,
		})

		if (result.isLeft()) {
			const error = result.value

			switch (error.constructor) {
				case ConnectionAlreadyExistsError:
					throw new ConflictException(error.message)
				case AgentNotFoundError:
					throw new ConflictException(error.message)
				case EvolutionInternalError:
					throw new ConflictException(error.message)
				default:
					throw new BadRequestException(error.message)
			}
		}

		if (result.isRight()) {
			const { connection, instance } = result.value

			return {
				connection: ConnectionPresenter.toHTTP(connection),
				instance,
			}
		}
	}
}

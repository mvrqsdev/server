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
import { AgentNotFoundError } from '@/application/use-cases/agents/errors/agent-not-found.error'
import { CreateConnectionUseCase } from '@/application/use-cases/connection/create-connection.use-case'
import { ConnectionAlreadyExistsError } from '@/application/use-cases/connection/errors/connection-already-exists.error'
import { EvolutionInternalError } from '@/application/webservice/evolution/errors/EvolutionInternal.error'
import { Roles } from '@/infra/authorization/roles.decorator'
import { ConnectionPresenter } from '../../presenters/connection/connection.presenter'

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

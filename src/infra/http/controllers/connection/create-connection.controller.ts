import {
	BadRequestException,
	Body,
	ConflictException,
	Controller,
	HttpCode,
	Post,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { createZodDto, UseZodGuard } from 'nestjs-zod'
import { z } from 'zod'
import { AgentMasterRequiredError } from '@/application/use-cases/agents/errors/agent-master-required.error'
import { AgentNotFoundError } from '@/application/use-cases/agents/errors/agent-not-found.error'
import { CreateConnectionUseCase } from '@/application/use-cases/connection/create-connection.use-case'
import { ConnectionAlreadyExistsError } from '@/application/use-cases/connection/errors/connection-already-exists.error'
import { ConnectionPrincipalNotFoundError } from '@/application/use-cases/connection/errors/connection-principal-not-found.error'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { CurrentUser } from '@/infra/authentication/current-user.decorator'
import { ConnectionPresenter } from '../../presenters/connection/connection.presenter'

const createConnectionBodySchema = z.object({
	agentId: z.string().uuid(),
	number: z.string(),
})

type CreateConnectionBodySchema = z.infer<typeof createConnectionBodySchema>

export class CreateConnectionDTO extends createZodDto(createConnectionBodySchema) {}

@Controller('/connections')
@ApiTags('Connection')
export class CreateConnectionController {
	constructor(private createConnection: CreateConnectionUseCase) {}

	@Post()
	@UseZodGuard('body', createConnectionBodySchema)
	@HttpCode(201)
	async handle(
		@Body() body: CreateConnectionBodySchema,
		@CurrentUser() currentAgent: Agent,
	) {
		const { agentId, number } = body

		const result = await this.createConnection.execute({
			requester: currentAgent,
			number,
			agentId,
		})

		if (result.isLeft()) {
			const error = result.value

			switch (error.constructor) {
				case AgentNotFoundError:
					throw new ConflictException(error.message)
				case ConnectionAlreadyExistsError:
					throw new ConflictException(error.message)
				case AgentMasterRequiredError:
					throw new ConflictException(error.message)
				case ConnectionPrincipalNotFoundError:
					throw new ConflictException(error.message)
				default:
					throw new BadRequestException(error.message)
			}
		}

		if (result.isRight()) {
			const { connection } = result.value

			return {
				connection: ConnectionPresenter.toHTTP(connection),
			}
		}
	}
}

import {
	BadRequestException,
	Body,
	ConflictException,
	Controller,
	Post,
	Req,
} from '@nestjs/common'
import { Request } from 'express'
import { createZodDto, UseZodGuard } from 'nestjs-zod'
import { z } from 'zod'
import { FailedToEncryptError } from '@/application/cryptography/errors/failed-to-encrypt.error'
import { AgentIsInactiveError } from '@/application/use-cases/agents/errors/agent-is-inactive.error'
import { AgentNotFoundError } from '@/application/use-cases/agents/errors/agent-not-found.error'
import { CreateAuthenticationUseCase } from '@/application/use-cases/authentication/create-authentication.use-case'
import { Public } from '@/infra/authentication/public'
import { Roles } from '@/infra/authorization/roles.decorator'

const createApiKeyBodySchema = z.object({
	agentId: z.string().uuid(),
	expiresAt: z.coerce.date().optional(),
})

type CreateAgentBodySchema = z.infer<typeof createApiKeyBodySchema>

export class CreateApiKeyDTO extends createZodDto(createApiKeyBodySchema) {}

@Controller('/api-keys')
export class CreateApiKeyController {
	constructor(private createAuthentication: CreateAuthenticationUseCase) {}

	@Post()
	@Public()
	@UseZodGuard('body', createApiKeyBodySchema)
	async handle(@Req() request: Request, @Body() body: CreateAgentBodySchema) {
		const { agentId, expiresAt } = body
		const ip = request.ip || request.socket.remoteAddress || undefined
		const userAgent = request.headers['user-agent'] || undefined

		const result = await this.createAuthentication.execute({
			agentId,
			expiresAt,
			strategy: 'ApiKey',
			ip,
			userAgent,
		})

		if (result.isLeft()) {
			const error = result.value

			switch (error.constructor) {
				case AgentNotFoundError:
					throw new ConflictException(error.message)
				case AgentIsInactiveError:
					throw new ConflictException(error.message)
				case FailedToEncryptError:
					throw new ConflictException(error.message)
				default:
					throw new BadRequestException(error.message)
			}
		}

		if (result.isRight()) {
			const { token } = result.value

			return {
				token,
			}
		}
	}
}

import {
	BadRequestException,
	Body,
	ConflictException,
	Controller,
	Post,
	Req,
} from '@nestjs/common'
import { ApiBody, ApiOperation } from '@nestjs/swagger'
import { Request } from 'express'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'
import { CreateAuthenticationUseCase } from '@/domain/real-state/application/use-cases/create-authentication.use-case'
import { AgentIsInactiveError } from '@/domain/real-state/application/use-cases/errors/agent-is-inactive.error'
import { AgentNotFoundError } from '@/domain/real-state/application/use-cases/errors/agent-not-found.error'
import { FailedToEncryptError } from '@/domain/real-state/application/use-cases/errors/failed-to-encrypt.error'

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
	@ApiOperation({
		operationId: 'createApiKey',
		summary: 'Create API Key',
		description: 'Create a key for the api.',
		tags: ['API'],
	})
	@ApiBody({
		type: CreateApiKeyDTO,
	})
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

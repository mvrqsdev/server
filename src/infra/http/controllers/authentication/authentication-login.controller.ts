import {
	BadRequestException,
	Body,
	Controller,
	Post,
	Req,
	UnauthorizedException,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { createZodDto, UseZodGuard } from 'nestjs-zod'
import { z } from 'zod'
import { AgentInvalidCredentialsError } from '@/application/use-cases/agents/errors/agent-invalid-credentials.error'
import { ValidateAgentByEmailAndPasswordUseCase } from '@/application/use-cases/agents/validate-agent-by-email-and-password.use-case'
import { CreateAuthenticationUseCase } from '@/application/use-cases/authentication/create-authentication.use-case'
import { Public } from '@/infra/authentication/public'

const createApiKeyBodySchema = z.object({
	email: z.string().email(),
	password: z.string(),
})

type CreateAgentBodySchema = z.infer<typeof createApiKeyBodySchema>

export class CreateApiKeyDTO extends createZodDto(createApiKeyBodySchema) {}

@Controller('/auth/login')
@ApiTags('Authentication')
export class AuthenticationLoginController {
	constructor(
		private createAuthentication: CreateAuthenticationUseCase,
		private validateAgentByEmailAndPassword: ValidateAgentByEmailAndPasswordUseCase,
	) {}

	@Post()
	@Public()
	@UseZodGuard('body', createApiKeyBodySchema)
	async handle(@Req() request: Request, @Body() body: CreateAgentBodySchema) {
		const { email, password } = body

		const resultValidate = await this.validateAgentByEmailAndPassword.execute({
			email,
			password,
		})

		if (resultValidate.isLeft()) {
			const error = resultValidate.value
			switch (error.constructor) {
				case AgentInvalidCredentialsError:
					throw new UnauthorizedException(error.message)
				default:
					throw new BadRequestException(error.message)
			}
		}

		const { agent } = resultValidate.value

		const ip = request.ip || request.socket.remoteAddress || undefined
		const userAgent = request.headers['user-agent'] || undefined

		const result = await this.createAuthentication.execute({
			agentId: agent.id.toString(),
			strategy: 'Session',
			ip,
			userAgent,
		})

		if (result.isLeft()) {
			const error = result.value
			throw new UnauthorizedException(error.message)
		}

		if (result.isRight()) {
			const { token } = result.value

			return {
				sessionId: token,
			}
		}
	}
}

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request, Response } from 'express'
import { GetAuthenticationAndAgentByTokenUseCase } from '@/application/use-cases/authentication/get-authentication-and-agent-by-token.use-case'
import { RevokeAuthenticationUseCase } from '@/application/use-cases/authentication/revoke-authentication.use-case'
import { UpdateAuthenticationExpirationUseCase } from '@/application/use-cases/authentication/update-authentication-expiration.use-case'
import { ErrorCodes } from '@/core/errors/codes'
import { IEnvService } from '@/core/repositories/env-service.interface'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { Authentication } from '@/domain/authentication/entities/authentication.entity'
import { IS_PUBLIC_KEY } from './public'

@Injectable()
export class AuthenticationGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private envService: IEnvService,
		private getAuthenticationAndAgent: GetAuthenticationAndAgentByTokenUseCase,
		private updateAuthenticationExpiration: UpdateAuthenticationExpirationUseCase,
		private revokeAuthentication: RevokeAuthenticationUseCase,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		])

		if (isPublic) return true

		const request = context.switchToHttp().getRequest<Request>()
		const response = context.switchToHttp().getResponse<Response>()
		const cookieName = await this.envService.get('AUTH_COOKIE_NAME')
		const sessionId: string = request.cookies?.[cookieName]
		const authorizationHeader = request.headers.authorization

		const token =
			sessionId ||
			(authorizationHeader?.startsWith('Bearer ')
				? authorizationHeader.replace('Bearer ', '').trim()
				: null)

		if (!token) {
			this.sendJsonError(response, 401, ErrorCodes.AUTHENTICATION.UNAUTHORIZED)
			return false
		}

		const result = await this.validate(token)

		if (!result) {
			this.sendJsonError(response, 401, ErrorCodes.AUTHENTICATION.UNAUTHORIZED)
			return false
		}

		request['agent'] = result.agent
		request['authentication'] = result.authentication

		return true
	}

	private sendJsonError(res: Response, statusCode: number, message: string) {
		res.status(statusCode).json({
			statusCode,
			message,
		})
	}

	async validate(token: string): Promise<{
		agent: Agent
		authentication: Authentication
	} | null> {
		const result = await this.getAuthenticationAndAgent.execute({ token })

		if (result.isLeft()) {
			return null
		}

		const { agent, authentication } = result.value

		if (agent.status === 'Inactive') {
			await this.revokeAuthentication.execute({ token })
			return null
		}

		const now = new Date()

		if (authentication.expiresAt && authentication.expiresAt < now) {
			await this.revokeAuthentication.execute({ token })
			return null
		}

		if (authentication.strategy === 'Session') {
			await this.updateAuthenticationExpiration.execute({ token })
		}

		return {
			agent,
			authentication,
		}
	}
}

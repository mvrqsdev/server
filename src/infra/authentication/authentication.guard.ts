import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { GetAuthenticationAndAgentByTokenUseCase } from '@/application/use-cases/authentication/get-authentication-and-agent-by-token.use-case'
import { RevokeAuthenticationByTokenUseCase } from '@/application/use-cases/authentication/revoke-authentication-by-token.use-case'
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
		private revokeAuthentication: RevokeAuthenticationByTokenUseCase,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		])

		if (isPublic) return true

		const request = context.switchToHttp().getRequest<Request>()
		const cookieName = await this.envService.get('AUTH_COOKIE_NAME')
		const sessionId: string = request.cookies?.[cookieName]
		const authorizationHeader = request.headers.authorization

		const token =
			sessionId ||
			(authorizationHeader?.startsWith('Bearer ')
				? authorizationHeader.replace('Bearer ', '').trim()
				: null)

		if (!token) {
			throw new UnauthorizedException({
				statusCode: 401,
				message: ErrorCodes.AUTHENTICATION.UNAUTHORIZED,
			})
		}

		const result = await this.validate(token)

		if (!result) {
			throw new UnauthorizedException({
				statusCode: 401,
				message: ErrorCodes.AUTHENTICATION.UNAUTHORIZED,
			})
		}

		request['agent'] = result.agent
		request['authentication'] = result.authentication

		return true
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

		if (authentication.revokedAt && authentication.revokedAt <= now) {
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

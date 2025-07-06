import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { GetAuthenticationAndAgentByTokenUseCase } from '@/domain/real-state/application/use-cases/get-authentication-and-agent-by-token.use-case'
import { RevokeAuthenticationUseCase } from '@/domain/real-state/application/use-cases/revoke-authentication.use-case'
import { UpdateAuthenticationExpirationUseCase } from '@/domain/real-state/application/use-cases/update-authentication-expiration.use-case'
import { Agent } from '@/domain/real-state/enterprise/entities/agent.entity'
import { Authentication } from '@/domain/real-state/enterprise/entities/authentication.entity'
import { IS_PUBLIC_KEY } from './public'

@Injectable()
export class AuthenticationGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
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

		const sessionId: string = request.cookies?.sessionId
		const authorizationHeader = request.headers.authorization

		const token =
			sessionId ||
			(authorizationHeader?.startsWith('Bearer ')
				? authorizationHeader.replace('Bearer ', '').trim()
				: null)

		if (!token) {
			throw new UnauthorizedException()
		}

		const result = await this.validate(token)

		if (!result) {
			throw new UnauthorizedException()
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

		if (authentication.strategy === 'Session') {
			await this.updateAuthenticationExpiration.execute({ token })
		}

		return {
			agent,
			authentication,
		}
	}
}

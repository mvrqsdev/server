import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { AgentFacade } from '@/application/facades/agent/agent.facade'

import { AuthenticationFacade } from '@/application/facades/authentication/authentication.facade'

import { CheckAgentIsActiveUseCase } from '@/application/use-cases/agent/check-agent-is-active.use-case'
import { FindAgentByAuthenticationUseCase } from '@/application/use-cases/agent/find-agent-by-authentication.use-case'
import { TokenNotFoundError } from '@/application/use-cases/authentication/errors/token-not-found.error'
import { GetAuthenticationByTokenUseCase } from '@/application/use-cases/authentication/get-authentication-by-token.use-case'
import { IEnvService } from '@/core/repositories/env-service.interface'
import { IS_PUBLIC_KEY } from './public'

@Injectable()
export class AuthenticationGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private envService: IEnvService,
		private authenticationFacade: AuthenticationFacade,
		private agentFacade: AgentFacade,
		private getAuthenticationByTokenUseCase: GetAuthenticationByTokenUseCase,
		private findAgentByAuthenticationUseCase: FindAgentByAuthenticationUseCase,
		private checkAgentIsActiveUseCase: CheckAgentIsActiveUseCase,
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
			throw new TokenNotFoundError()
		}

		const { authentication } = await this.authenticationFacade.validate(
			this.getAuthenticationByTokenUseCase,
			{ token },
		)
		const { agent } = await this.agentFacade.getAgent(
			this.findAgentByAuthenticationUseCase,
			{ authentication },
		)
		await this.checkAgentIsActiveUseCase.execute({ agent })

		request['agent'] = agent
		request['authentication'] = authentication

		return true
	}
}

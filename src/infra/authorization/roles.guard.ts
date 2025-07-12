// roles.guard.ts
import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ErrorCodes } from '@/core/errors/codes'
import { ROLES_KEY } from './roles.decorator'

type roles = 'Admin' | 'Marketing' | 'Agent'
@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<roles[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		])

		// ✅ Se nenhuma role foi exigida, deixa passar direto
		if (!requiredRoles || requiredRoles.length === 0) {
			return true
		}

		const request = context.switchToHttp().getRequest()
		const agent = request.agent

		if (!agent) {
			throw new UnauthorizedException({
				statusCode: 401,
				message: ErrorCodes.AUTHORIZATION.UNAUTHORIZED,
			})
		}

		if (!requiredRoles.includes(agent.role)) {
			throw new UnauthorizedException({
				statusCode: 401,
				message: ErrorCodes.AUTHORIZATION.UNAUTHORIZED,
			})
		}

		return true
	}
}

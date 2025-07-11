// roles.guard.ts
import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
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
			throw new ForbiddenException('Agente não autenticado')
		}

		if (!requiredRoles.includes(agent.role)) {
			throw new ForbiddenException('Unauthorized.')
		}

		return true
	}
}

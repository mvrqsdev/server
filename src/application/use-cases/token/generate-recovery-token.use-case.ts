import { Injectable } from '@nestjs/common'
import {
	GenerateTokenStrategy,
	GenerateTokenStrategyProps,
} from '@/application/facades/token/contract/generate-token-strategy'
import { clock } from '@/core/helpers/dayjs'
import { IEnvService } from '@/core/repositories/env-service.interface'
import { Token } from '@/domain/token/entities/token.entity'

@Injectable()
export class GenerateRecoveryTokenUseCase implements GenerateTokenStrategy {
	constructor(private envService: IEnvService) {}
	async getToken({ agent }: GenerateTokenStrategyProps): Promise<{ token: Token }> {
		const minutes = this.envService.get('RECOVERY_PASSWORD_TOKEN_EXPIRATION_TIME')
		const expiresAt = clock().add(Number(minutes), 'minute').toDate()
		const token = Token.create({ agentId: agent.id, expiresAt, type: 'PasswordRecovery' })

		return { token }
	}
}

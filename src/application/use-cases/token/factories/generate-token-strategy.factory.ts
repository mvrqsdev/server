import { Injectable } from '@nestjs/common'
import { TokenType } from '@prisma/client'

import { GenerateTokenStrategy } from '@/application/facades/token/contract/generate-token-strategy'
import { GenerateStrategyNotFoundError } from '../errors/generate-strategy-not-found.error'
import { GenerateConfirmEmailTokenUseCase } from '../generate-confirm-email-token.use-case'
import { GenerateInviteTokenUseCase } from '../generate-invite-token.use-case'
import { GenerateRecoveryTokenUseCase } from '../generate-recovery-token.use-case'

@Injectable()
export class GenerateTokenStrategyFactory {
	constructor(
		private generateInviteTokenUseCase: GenerateInviteTokenUseCase,
		private generateConfirmEmailTokenUseCase: GenerateConfirmEmailTokenUseCase,
		private generateRecoveryTokenUseCase: GenerateRecoveryTokenUseCase,
	) {}
	async getStrategy(type: TokenType): Promise<GenerateTokenStrategy> {
		if (type === 'Invite') {
			return this.generateInviteTokenUseCase
		}

		if (type === 'EmailVerification') {
			return this.generateConfirmEmailTokenUseCase
		}

		if (type === 'PasswordRecovery') {
			return this.generateRecoveryTokenUseCase
		}

		throw new GenerateStrategyNotFoundError()
	}
}

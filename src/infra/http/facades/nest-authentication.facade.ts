import { Injectable } from '@nestjs/common'
import {
	AuthenticationFacade,
	CreateProps,
	RenewTokenProps,
} from '@/application/facades/authentication/authentication.facade'
import {
	AuthenticationStrategyType,
	AuthenticationStrategyTypeMap,
} from '@/application/facades/authentication/contract/get-authentication-strategy'
import { CheckIfAuthenticationIsValidUseCase } from '@/application/use-cases/authentication/check-if-authentication-is-valid.use-case'
import { CreateAuthenticationUseCase } from '@/application/use-cases/authentication/create-authentication.use-case'
import { GetAuthenticationFactory } from '@/application/use-cases/authentication/factories/get-authentication-strategy.factory'
import { RevokeAuthenticationUseCase } from '@/application/use-cases/authentication/revoke-authentication.use-case'
import { UpdateAuthenticationExpirationUseCase } from '@/application/use-cases/authentication/update-authentication-expiration.use-case'
import { Authentication } from '@/domain/authentication/entities/authentication.entity'

@Injectable()
export class NestAuthenticationFacade implements AuthenticationFacade {
	constructor(
		private checkIfAuthenticationIsValidUseCase: CheckIfAuthenticationIsValidUseCase,
		private updateAuthenticationExpirationUseCase: UpdateAuthenticationExpirationUseCase,
		private createAuthenticationUseCase: CreateAuthenticationUseCase,
		private revokeAuthenticationUseCase: RevokeAuthenticationUseCase,
		private getAuthenticationFactory: GetAuthenticationFactory,
	) {}
	async validate<T extends AuthenticationStrategyType>(
		type: T,
		data: AuthenticationStrategyTypeMap[T],
	): Promise<{ authentication: Authentication }> {
		const strategy = await this.getAuthenticationFactory.getAuthenticationStrategy({
			type,
		})
		const { authentication } = await strategy.execute(data)
		await this.checkIfAuthenticationIsValidUseCase.execute({ authentication })
		const { authentication: updatedAuthentication } =
			await this.updateAuthenticationExpirationUseCase.execute({ authentication })
		return { authentication: updatedAuthentication }
	}
	async getAuthentication<T extends AuthenticationStrategyType>(
		type: T,
		data: AuthenticationStrategyTypeMap[T],
	): Promise<{ authentication: Authentication }> {
		const strategy = await this.getAuthenticationFactory.getAuthenticationStrategy({
			type,
		})
		const { authentication } = await strategy.execute(data)
		return { authentication }
	}

	async create(params: CreateProps): Promise<{ authentication: Authentication }> {
		const { authentication } = await this.createAuthenticationUseCase.execute(params)
		return { authentication }
	}

	async revokeToken(
		authentication: Authentication,
	): Promise<{ authentication: Authentication }> {
		const { authentication: revokedAuthentication } =
			await this.revokeAuthenticationUseCase.execute({ authentication })
		return {
			authentication: revokedAuthentication,
		}
	}

	async renewToken(params: RenewTokenProps): Promise<{ authentication: Authentication }> {
		const { authentication } =
			await this.updateAuthenticationExpirationUseCase.execute(params)
		return { authentication }
	}
}

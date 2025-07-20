import { Injectable } from '@nestjs/common'
import {
	AuthenticationFacade,
	CreateProps,
} from '@/application/facades/authentication/authentication.facade'
import { GetAuthenticationStrategy } from '@/application/facades/authentication/contract/get-authentication-strategy'
import { CheckIfAuthenticationIsValidUseCase } from '@/application/use-cases/authentication/check-if-authentication-is-valid.use-case'
import { CreateAuthenticationUseCase } from '@/application/use-cases/authentication/create-authentication.use-case'
import { UpdateAuthenticationExpirationUseCase } from '@/application/use-cases/authentication/update-authentication-expiration.use-case'
import { Authentication } from '@/domain/authentication/entities/authentication.entity'

@Injectable()
export class NestAuthenticationFacade implements AuthenticationFacade {
	constructor(
		private checkIfAuthenticationIsValidUseCase: CheckIfAuthenticationIsValidUseCase,
		private updateAuthenticationExpirationUseCase: UpdateAuthenticationExpirationUseCase,
		private createAuthenticationUseCase: CreateAuthenticationUseCase,
	) {}
	async create(params: CreateProps): Promise<{ authentication: Authentication }> {
		const { authentication } = await this.createAuthenticationUseCase.execute(params)
		return { authentication }
	}

	async validate<TData>(
		strategy: GetAuthenticationStrategy<TData>,
		data: TData,
	): Promise<{ authentication: Authentication }> {
		const { authentication } = await strategy.execute(data)
		await this.checkIfAuthenticationIsValidUseCase.execute({ authentication })
		const { authentication: updatedAuthentication } =
			await this.updateAuthenticationExpirationUseCase.execute({ authentication })
		return { authentication: updatedAuthentication }
	}

	async revokeToken(authentication: Authentication): Promise<void> {
		throw new Error('Method not implemented.')
	}
	async renewToken(authentication: Authentication): Promise<void> {
		throw new Error('Method not implemented.')
	}
}

import { GetAuthenticationByTokenUseCaseRequest } from '@/application/use-cases/authentication/get-authentication-by-token.use-case'
import { Authentication } from '@/domain/authentication/entities/authentication.entity'
export interface AuthenticationStrategyTypeMap {
	token: GetAuthenticationByTokenUseCaseRequest
}

export type AuthenticationStrategyType = keyof AuthenticationStrategyTypeMap
export abstract class GetAuthenticationStrategy<TData> {
	abstract execute(params: TData): Promise<{ authentication: Authentication }>
}

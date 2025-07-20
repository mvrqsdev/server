import { Agent } from '@/domain/agent/entities/agent.entity'
import { Authentication } from '@/domain/authentication/entities/authentication.entity'
import { GetAuthenticationStrategy } from './contract/get-authentication-strategy'

export abstract class AuthenticationFacade {
	abstract create(params: CreateProps): Promise<{ authentication: Authentication }>
	abstract validate<TData>(
		strategy: GetAuthenticationStrategy<TData>,
		data: TData,
	): Promise<{ authentication: Authentication }>
	abstract revokeToken(authentication: Authentication): Promise<void>
	abstract renewToken(authentication: Authentication): Promise<void>
}

export interface CreateProps {
	agent: Agent
	strategy: 'ApiKey' | 'Session'
	ip?: string
	userAgent?: string
	expiresAt?: Date
}

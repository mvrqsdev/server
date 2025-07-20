import { Agent } from '@/domain/agent/entities/agent.entity'
import { Authentication } from '@/domain/authentication/entities/authentication.entity'
import { GetAuthenticationStrategy } from './contract/get-authentication-strategy'

export abstract class AuthenticationFacade {
	abstract create(params: CreateProps): Promise<{ authentication: Authentication }>
	abstract getAuthentication<TData>(
		strategy: GetAuthenticationStrategy<TData>,
		data: TData,
	): Promise<{ authentication: Authentication }>
	abstract validate<TData>(
		strategy: GetAuthenticationStrategy<TData>,
		data: TData,
	): Promise<{ authentication: Authentication }>
	abstract revokeToken(
		authentication: Authentication,
	): Promise<{ authentication: Authentication }>
	abstract renewToken(
		params: RenewTokenProps,
	): Promise<{ authentication: Authentication }>
}

export interface CreateProps {
	agent: Agent
	strategy: 'ApiKey' | 'Session'
	ip?: string
	userAgent?: string
	expiresAt?: Date
}

export interface RenewTokenProps {
	authentication: Authentication
	expiresAt?: Date | null
}

import { Agent } from '@/domain/agent/entities/agent.entity'
import { Authentication } from '@/domain/authentication/entities/authentication.entity'
import {
	AuthenticationStrategyType,
	AuthenticationStrategyTypeMap,
} from './contract/get-authentication-strategy'

export abstract class AuthenticationFacade {
	abstract create(params: CreateProps): Promise<{ authentication: Authentication }>
	abstract getAuthentication<T extends AuthenticationStrategyType>(
		type: T,
		data: AuthenticationStrategyTypeMap[T],
	): Promise<{ authentication: Authentication }>

	abstract validate<T extends AuthenticationStrategyType>(
		type: T,
		data: AuthenticationStrategyTypeMap[T],
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

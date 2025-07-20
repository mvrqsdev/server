import { Authentication } from '@/domain/authentication/entities/authentication.entity'

export abstract class ValidateAuthenticationStrategy<TData> {
	abstract validate(params: TData): Promise<{ authentication: Authentication }>
}

import { Authentication } from '@/domain/authentication/entities/authentication.entity'

export abstract class GetAuthenticationStrategy<TData> {
	abstract execute(params: TData): Promise<{ authentication: Authentication }>
}

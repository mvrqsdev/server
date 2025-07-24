import { Authentication } from '@/domain/authentication/entities/authentication.entity'

export abstract class AuthenticationRepository {
	abstract getByToken(token: string): Promise<Authentication | null>
	abstract create(authentication: Authentication): Promise<void>
	abstract save(authentication: Authentication): Promise<void>
}

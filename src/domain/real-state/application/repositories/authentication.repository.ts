import { Authentication } from '../../enterprise/entities/authentication.entity'

export abstract class AuthenticationRepository {
	abstract findById(id: string): Promise<Authentication | null>
	abstract findByToken(token: string): Promise<Authentication | null>
	abstract updateAuthenticationExpiration(
		authentication: Authentication,
	): Promise<Authentication>
	abstract revokeAuthenticationExpiration(authentication: Authentication): Promise<void>
	abstract create(authentication: Authentication): Promise<void>
	abstract save(authentication: Authentication): Promise<void>
}

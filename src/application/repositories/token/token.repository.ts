import { Token } from '@/domain/token/token.entity'

export abstract class TokenRepository {
	abstract findByToken(token: string): Promise<Token | null>
}

import { TokenRepository } from '@/application/repositories/token/token.repository'
import { Token } from '@/domain/token/token.entity'

export class PrismaTokenRepository implements TokenRepository {
	findByToken(token: string): Promise<Token | null> {
		throw new Error('Method not implemented.')
	}
}

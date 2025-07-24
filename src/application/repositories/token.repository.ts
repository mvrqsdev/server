import { Token } from '@/domain/token/entities/token.entity'
import { FindAllTokensByFiltersRequest } from '../use-cases/token/find-all-tokens-by-filters.use-case'

export abstract class TokenRepository {
	abstract findById(id: string): Promise<Token | null>
	abstract findByToken(value: string): Promise<Token | null>
	abstract findByFilters(params: FindAllTokensByFiltersRequest): Promise<Token[]>
	abstract create(token: Token): Promise<void>
	abstract save(token: Token): Promise<void>
}

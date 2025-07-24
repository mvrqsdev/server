import { Token } from '@/domain/token/entities/token.entity'

export abstract class GetTokenStrategy<TData> {
	abstract execute(params: TData): Promise<{ token: Token }>
}

import { Token } from '@/domain/token/entities/token.entity'

export abstract class GetManyTokensStrategy<TData> {
	abstract execute(params: TData): Promise<{ tokens: Token[] }>
}

import { IAMessage } from '@/domain/ia-message/entities/ia-message.entity'

export abstract class GetIAMessageStrategy<TData> {
	abstract execute(params: TData): Promise<{ iaMessage: IAMessage }>
}

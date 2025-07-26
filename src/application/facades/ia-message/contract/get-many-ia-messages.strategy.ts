import { IAMessage } from '@/domain/ia-message/entities/ia-message.entity'

export abstract class GetManyIAMessagesStrategy<TData> {
	abstract execute(params: TData): Promise<{ iaMessages: IAMessage[] }>
}

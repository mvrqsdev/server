export abstract class MailStrategy<TData> {
	abstract send(params: TData): Promise<void>
}

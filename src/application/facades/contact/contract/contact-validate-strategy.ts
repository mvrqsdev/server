export abstract class ContactValidateStrategy<TData> {
	abstract execute(params: TData): Promise<boolean>
}

export abstract class LeadValidateStrategy<TData> {
	abstract execute(params: TData): Promise<boolean>
}

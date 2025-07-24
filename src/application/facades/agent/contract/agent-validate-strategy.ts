export abstract class AgentValidateStrategy<TData> {
	abstract execute(params: TData): Promise<void>
}

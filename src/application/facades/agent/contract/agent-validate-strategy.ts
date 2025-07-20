export abstract class AgentValidateStrategy<TData, TResponse> {
	abstract validate(params: TData): Promise<TResponse>
}

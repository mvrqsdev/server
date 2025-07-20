export abstract class GetAgentStrategy<TData, TResponse> {
	abstract execute(params: TData): Promise<TResponse>
}

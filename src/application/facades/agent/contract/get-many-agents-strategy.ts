export abstract class GetManyAgentsStrategy<TData, TResponse> {
	abstract execute(params: TData): Promise<TResponse>
}

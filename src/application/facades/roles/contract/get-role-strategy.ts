export abstract class GetRoleStrategy<TData, TResponse> {
	abstract execute(params: TData): Promise<TResponse>
}

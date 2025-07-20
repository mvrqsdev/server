export abstract class GetManyRoleStrategy<TData, TResponse> {
	abstract execute(params: TData): Promise<TResponse>
}

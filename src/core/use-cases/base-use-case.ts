export interface BaseUseCase<TRequest, TResponse> {
	execute(params: TRequest): Promise<TResponse>
}

export abstract class BaseQueryBuilder<TBuilder extends BaseQueryBuilder<TBuilder>> {
	private andCallbacks: Array<(builder: TBuilder) => void> = []
	private orCallbacks: Array<(builder: TBuilder) => void> = []

	public and(callback: (builder: TBuilder) => void): this {
		this.andCallbacks.push(callback)
		return this
	}

	public or(callback: (builder: TBuilder) => void): this {
		this.orCallbacks.push(callback)
		return this
	}

	protected getAnd(): Array<(builder: TBuilder) => void> {
		return this.andCallbacks
	}

	protected getOr(): Array<(builder: TBuilder) => void> {
		return this.orCallbacks
	}

	/**
	 * Aplica callbacks (and/or) em novos builders e retorna os resultados de buildWhere.
	 * Pode ser usado para compor AND/OR em qualquer implementação concreta.
	 */
	protected buildLogicalFilters<TResult>(
		callbacks: Array<(builder: TBuilder) => void>,
		builderFactory: () => TBuilder,
	): TResult[] {
		return callbacks.map((cb) => {
			const builder = builderFactory()
			cb(builder)
			return (builder as any).buildWhere() as TResult
		})
	}
}

import { CreateInstanceRequest, CreateInstanceResponse } from './interface'

export abstract class EvolutionRepository {
	abstract createInstance(
		data: CreateInstanceRequest,
	): Promise<CreateInstanceResponse | null>
}

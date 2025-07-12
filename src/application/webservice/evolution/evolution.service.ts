import { CreateInstanceRequest, CreateInstanceResponse } from './interface'

export abstract class IEvolutionService {
	abstract createInstance(data: CreateInstanceRequest): Promise<CreateInstanceResponse>
}

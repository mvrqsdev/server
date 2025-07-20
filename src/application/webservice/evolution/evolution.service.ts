import {
	CreateInstanceRequest,
	CreateInstanceResponse,
	FetchInstanceRequest,
	FetchInstanceResponse,
} from './interface'

export abstract class IEvolutionService {
	abstract createInstance(data: CreateInstanceRequest): Promise<CreateInstanceResponse>
	abstract fetchInstances(data: FetchInstanceRequest): Promise<FetchInstanceResponse[]>
}

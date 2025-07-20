import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { EvolutionInternalError } from '@/application/webservice/evolution/errors/EvolutionInternal.error'
import { IEvolutionService } from '@/application/webservice/evolution/evolution.service'
import {
	CreateInstanceRequest,
	CreateInstanceResponse,
	FetchInstanceRequest,
	FetchInstanceResponse,
} from '@/application/webservice/evolution/interface'

@Injectable()
export class EvolutionService implements IEvolutionService {
	constructor(private httpService: HttpService) {}
	fetchInstances(data: FetchInstanceRequest): Promise<FetchInstanceResponse[]> {
		throw new Error('Method not implemented.')
	}
	async createInstance(data: CreateInstanceRequest): Promise<CreateInstanceResponse> {
		const request = await this.httpService.axiosRef.post('/instance/create', data)
		if (request.status === 201) {
			const data = request.data as CreateInstanceResponse
			return data
		}
		throw new EvolutionInternalError()
	}
}

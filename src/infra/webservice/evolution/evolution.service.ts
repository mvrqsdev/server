import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { IEvolutionService } from '@/application/webservice/evolution/evolution.service'
import {
	CreateInstanceRequest,
	CreateInstanceResponse,
} from '@/application/webservice/evolution/interface'
import { DomainError } from '@/core/errors/errors/domain.error'

@Injectable()
export class EvolutionService implements IEvolutionService {
	constructor(private httpService: HttpService) {}
	async createInstance(data: CreateInstanceRequest): Promise<CreateInstanceResponse> {
		const request = await this.httpService.axiosRef.post('/instance/create', data)
		if (request.status === 201) {
			const data = request.data as CreateInstanceResponse
			return data
		}
		throw new DomainError('')
	}
}

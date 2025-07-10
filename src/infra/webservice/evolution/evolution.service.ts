import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { EvolutionRepository } from '@/application/webservice/evolution/evolution.repository'
import {
	CreateInstanceRequest,
	CreateInstanceResponse,
} from '@/application/webservice/evolution/interface'

@Injectable()
export class EvolutionService implements EvolutionRepository {
	constructor(private httpService: HttpService) {}
	async createInstance(
		data: CreateInstanceRequest,
	): Promise<CreateInstanceResponse | null> {
		return this.httpService.axiosRef
			.post('/instance/create', data)
			.then((response) => {
				return response.status === 201 ? (response.data as CreateInstanceResponse) : null
			})
			.catch(() => {
				return null
			})
	}
}

import { Injectable } from '@nestjs/common'
import { GetManyInstancesStrategy } from '@/application/facades/instance/contract/get-many-instances-strategy'
import { ManyInstancesFilter } from '@/application/facades/instance/interface'
import { InstanceRepository } from '@/application/repositories/instance.repository'
import { Instance } from '@/domain/instance/entities/instance.entity'

@Injectable()
export class FindManyInstancesByFiltersUseCase
	implements GetManyInstancesStrategy<ManyInstancesFilter>
{
	constructor(private instanceRepository: InstanceRepository) {}
	async execute(params: ManyInstancesFilter): Promise<{ instances: Instance[] }> {
		const instances = await this.instanceRepository.findManyByFilters(params)
		return {
			instances,
		}
	}
}

import { Injectable } from '@nestjs/common'
import { GetInstanceStrategy } from '@/application/facades/instance/contract/get-instance-strategy'
import { InstanceRepository } from '@/application/repositories/instance.repository'
import { Instance } from '@/domain/instance/entities/instance.entity'
import { InstanceNotFoundError } from './errors/instance-not-found.error'

export interface FindInstanceByIdUseCaseRequest {
	instanceId: string
}

@Injectable()
export class FindInstanceByIdUseCase
	implements GetInstanceStrategy<FindInstanceByIdUseCaseRequest>
{
	constructor(private instanceRepository: InstanceRepository) {}
	async execute({
		instanceId,
	}: FindInstanceByIdUseCaseRequest): Promise<{ instance: Instance }> {
		const instance = await this.instanceRepository.findById(instanceId)
		if (!instance) {
			throw new InstanceNotFoundError()
		}

		return {
			instance,
		}
	}
}

import { Injectable } from '@nestjs/common'
import { InstanceCreate } from '@/application/facades/instance/interface'
import { InstanceRepository } from '@/application/repositories/instance.repository'
import { BaseUseCase } from '@/core/use-cases/base-use-case'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { Instance } from '@/domain/instance/entities/instance.entity'

interface CreateInstanceUseCaseResponse {
	instance: Instance
}

@Injectable()
export class CreateInstanceUseCase
	implements BaseUseCase<InstanceCreate, CreateInstanceUseCaseResponse>
{
	constructor(private instanceRepository: InstanceRepository) {}
	async execute({
		name,
		agentId,
	}: InstanceCreate): Promise<CreateInstanceUseCaseResponse> {
		const instance = Instance.create({
			name,
			agentId: new UniqueEntityID(agentId),
		})

		await this.instanceRepository.create(instance)

		return {
			instance,
		}
	}
}

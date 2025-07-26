import { Injectable } from '@nestjs/common'
import { InstanceFacade } from '@/application/facades/instance/instance.facade'
import { InstanceCreate, InstanceUpdate } from '@/application/facades/instance/interface'
import { CreateInstanceUseCase } from '@/application/use-cases/instance/create-instance.use-case'
import {
	GetInstanceStrategyFactory,
	GetInstanceStrategyFactoryTypeMap,
} from '@/application/use-cases/instance/factories/get-instance-strategy.factory'
import {
	GetManyInstanceStrategyFactory,
	GetManyInstancesStrategyFactoryTypeMap,
} from '@/application/use-cases/instance/factories/get-many-instances-strategy.factory'
import { UpdateInstanceUseCase } from '@/application/use-cases/instance/update-instance.use-case'
import { Instance } from '@/domain/instance/entities/instance.entity'

@Injectable()
export class NestInstanceFacade implements InstanceFacade {
	constructor(
		private getInstanceStrategyFactory: GetInstanceStrategyFactory,
		private getManyInstanceStrategyFactory: GetManyInstanceStrategyFactory,
		private updateInstanceUseCase: UpdateInstanceUseCase,
		private createInstanceUseCase: CreateInstanceUseCase,
	) {}
	async getManyInstance<T extends keyof GetManyInstancesStrategyFactoryTypeMap>(
		type: T,
		data: GetManyInstancesStrategyFactoryTypeMap[T],
	): Promise<{ instances: Instance[] }> {
		const strategy = await this.getManyInstanceStrategyFactory.getStrategy({ type })
		return strategy.execute(data)
	}
	async create(params: InstanceCreate): Promise<{ instance: Instance }> {
		const { instance } = await this.createInstanceUseCase.execute(params)
		return { instance }
	}
	async update<T extends keyof GetInstanceStrategyFactoryTypeMap>(
		type: T,
		data: GetInstanceStrategyFactoryTypeMap[T],
		params: InstanceUpdate,
	): Promise<{ instance: Instance }> {
		const strategy = await this.getInstanceStrategyFactory.getStrategy({ type })
		const { instance } = await strategy.execute(data)
		const { instance: createdInstance } = await this.updateInstanceUseCase.execute({
			instance,
			...params,
		})
		return {
			instance: createdInstance,
		}
	}
	async getInstance<T extends keyof GetInstanceStrategyFactoryTypeMap>(
		type: T,
		data: GetInstanceStrategyFactoryTypeMap[T],
	): Promise<{ instance: Instance }> {
		const strategy = await this.getInstanceStrategyFactory.getStrategy({ type })
		return await strategy.execute(data)
	}
}

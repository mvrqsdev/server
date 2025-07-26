import { GetInstanceStrategyFactoryTypeMap } from '@/application/use-cases/instance/factories/get-instance-strategy.factory'
import { GetManyInstancesStrategyFactoryTypeMap } from '@/application/use-cases/instance/factories/get-many-instances-strategy.factory'
import { Instance } from '@/domain/instance/entities/instance.entity'
import { InstanceCreate, InstanceUpdate } from './interface'

export abstract class InstanceFacade {
	abstract create(params: InstanceCreate): Promise<{ instance: Instance }>
	abstract update<T extends keyof GetInstanceStrategyFactoryTypeMap>(
		type: T,
		data: GetInstanceStrategyFactoryTypeMap[T],
		params: InstanceUpdate,
	): Promise<{ instance: Instance }>
	abstract getInstance<T extends keyof GetInstanceStrategyFactoryTypeMap>(
		type: T,
		data: GetInstanceStrategyFactoryTypeMap[T],
	): Promise<{ instance: Instance }>
	abstract getManyInstance<T extends keyof GetManyInstancesStrategyFactoryTypeMap>(
		type: T,
		data: GetManyInstancesStrategyFactoryTypeMap[T],
	): Promise<{ instances: Instance[] }>
}

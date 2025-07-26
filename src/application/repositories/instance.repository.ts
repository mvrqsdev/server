import { Instance } from '@/domain/instance/entities/instance.entity'
import { ManyInstancesFilter } from '../facades/instance/interface'

export abstract class InstanceRepository {
	abstract findById(id: string): Promise<Instance | null>
	abstract findManyByFilters(params: ManyInstancesFilter): Promise<Instance[]>
	abstract create(instance: Instance): Promise<void>
	abstract save(instance: Instance): Promise<void>
}

import { Instance } from '@/domain/instance/entities/instance.entity'

export abstract class GetManyInstancesStrategy<TData> {
	abstract execute(params: TData): Promise<{ instances: Instance[] }>
}

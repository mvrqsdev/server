import { Instance } from '@/domain/instance/entities/instance.entity'

export abstract class GetInstanceStrategy<TData> {
	abstract execute(params: TData): Promise<{ instance: Instance }>
}

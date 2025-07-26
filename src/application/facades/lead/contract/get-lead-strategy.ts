import { Lead } from '@/domain/lead/entities/lead.entity'

export abstract class GetLeadStrategy<TData> {
	abstract execute(params: TData): Promise<{ lead: Lead }>
}

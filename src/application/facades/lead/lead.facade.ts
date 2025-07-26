import { GetLeadStrategyFactoryTypeMap } from '@/application/use-cases/lead/factories/get-lead-strategy.factory'
import { Lead } from '@/domain/lead/entities/lead.entity'
import { LeadCreate, LeadUpdate } from './interface'

export abstract class LeadFacade {
	abstract create(params: LeadCreate): Promise<{ lead: Lead }>
	abstract update<T extends keyof GetLeadStrategyFactoryTypeMap>(
		type: T,
		data: GetLeadStrategyFactoryTypeMap[T],
		params: LeadUpdate,
	): Promise<{ lead: Lead }>
	abstract getLead<T extends keyof GetLeadStrategyFactoryTypeMap>(
		type: T,
		data: GetLeadStrategyFactoryTypeMap[T],
	): Promise<{ lead: Lead }>
}

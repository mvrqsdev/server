import { Injectable } from '@nestjs/common'
import { LeadCreate, LeadUpdate } from '@/application/facades/lead/interface'
import { LeadFacade } from '@/application/facades/lead/lead.facade'
import { CreateLeadUseCase } from '@/application/use-cases/lead/create-lead.use-case'
import {
	GetLeadStrategyFactory,
	GetLeadStrategyFactoryTypeMap,
} from '@/application/use-cases/lead/factories/get-lead-strategy.factory'
import { UpdateLeadUseCase } from '@/application/use-cases/lead/update-lead.use-case'
import { Lead } from '@/domain/lead/entities/lead.entity'

@Injectable()
export class NestLeadFacade implements LeadFacade {
	constructor(
		private getLeadStrategyFactory: GetLeadStrategyFactory,
		private createLeadUseCase: CreateLeadUseCase,
		private updateLeadUseCase: UpdateLeadUseCase,
	) {}
	async create(params: LeadCreate): Promise<{ lead: Lead }> {
		const { lead } = await this.createLeadUseCase.execute(params)
		return { lead }
	}
	async update<T extends keyof GetLeadStrategyFactoryTypeMap>(
		type: T,
		data: GetLeadStrategyFactoryTypeMap[T],
		params: LeadUpdate,
	): Promise<{ lead: Lead }> {
		const strategy = await this.getLeadStrategyFactory.getStrategy({ type })
		const { lead } = await strategy.execute(data)
		const { lead: updatedLead } = await this.updateLeadUseCase.execute({
			lead,
			...params,
		})
		return {
			lead: updatedLead,
		}
	}
	async getLead<T extends keyof GetLeadStrategyFactoryTypeMap>(
		type: T,
		data: GetLeadStrategyFactoryTypeMap[T],
	): Promise<{ lead: Lead }> {
		const strategy = await this.getLeadStrategyFactory.getStrategy({ type })
		const { lead } = await strategy.execute(data)

		return {
			lead,
		}
	}
}

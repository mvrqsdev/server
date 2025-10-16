import { Injectable } from '@nestjs/common'
import { LeadCreate, LeadUpdate } from '@/application/facades/lead/interface'
import { LeadFacade } from '@/application/facades/lead/lead.facade'
import { CheckIfLastLeadFromContactIsActive } from '@/application/use-cases/lead/check-if-last-lead-from-contact-is-active.use-case'
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
		private checkIfLastLeadFromContactIsActive: CheckIfLastLeadFromContactIsActive,
	) {}
	async findOrCreate(params: LeadCreate): Promise<{ lead: Lead }> {
		const lastLeadIsActive = await this.checkIfLastLeadFromContactIsActive.execute({
			contactId: params.contactId,
		})

		if (lastLeadIsActive) {
			const strategy = await this.getLeadStrategyFactory.getStrategy({
				type: 'contactId',
			})
			const { lead } = await strategy.execute({ contactId: params.contactId })

			return { lead }
		}
		const { lead } = await this.createLeadUseCase.execute(params)
		return {
			lead,
		}
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

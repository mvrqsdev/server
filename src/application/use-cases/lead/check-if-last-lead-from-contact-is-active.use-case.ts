import { Injectable } from '@nestjs/common'
import { LeadValidateStrategy } from '@/application/facades/lead/contract/lead-validate-strategy'
import { LeadRepository } from '@/application/repositories/lead.repository'

export interface CheckIfLastLeadFromContactIsActiveRequest {
	contactId: string
}

@Injectable()
export class CheckIfLastLeadFromContactIsActive
	implements LeadValidateStrategy<CheckIfLastLeadFromContactIsActiveRequest>
{
	constructor(private leadRepository: LeadRepository) {}
	async execute({
		contactId,
	}: CheckIfLastLeadFromContactIsActiveRequest): Promise<boolean> {
		const lead = await this.leadRepository.findLastLeadByContactId(contactId)
		return !!lead && lead.status.state !== 'Off'
	}
}

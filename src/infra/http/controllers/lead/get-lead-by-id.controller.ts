import { BadRequestException, Controller, Get, HttpCode, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { GetLeadByIdUseCase } from '@/application/use-cases/leads/get-lead-by-id.use-case'
import { Roles } from '@/infra/authorization/roles.decorator'
import { LeadDetailsPresenter } from '../../presenters/lead/lead-details.presenter'

@Controller('/leads/:leadId')
@ApiTags('Leads')
export class GetLeadByIdController {
	constructor(private getLeadById: GetLeadByIdUseCase) {}

	@Get()
	@Roles('Admin')
	@HttpCode(200)
	async handle(@Param('leadId') leadId: string) {
		const result = await this.getLeadById.execute({ leadId })

		if (result.isLeft()) {
			throw new BadRequestException()
		}

		return { lead: LeadDetailsPresenter.toHTTP(result.value.lead) }
	}
}

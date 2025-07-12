import {
	BadRequestException,
	Body,
	ConflictException,
	Controller,
	HttpCode,
	Param,
	Put,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { createZodDto, UseZodGuard } from 'nestjs-zod'
import { z } from 'zod'
import { LeadNotFoundError } from '@/application/use-cases/leads/errors/lead-not-found.error'
import { UpdateLeadUseCase } from '@/application/use-cases/leads/update-lead.use-case'
import { Agent } from '@/domain/agent/entities/agent.entity'
import { CurrentUser } from '@/infra/authentication/current-user.decorator'
import { Roles } from '@/infra/authorization/roles.decorator'

const schedulingsSchema = z.array(
	z.object({
		id: z.string().uuid().optional(),
		agentId: z.string().uuid(),
		status: z.enum(['Scheduled', 'Visited']),
		scheduled: z.coerce.date(),
	}),
)

const leadStatusSchema = z.enum([
	'Contract',
	'CreditAnalysis',
	'Folder',
	'Off',
	'PreService',
	'Proposal',
	'Scheduling',
	'Service',
	'Visit',
])

const updateLeadBodySchema = z.object({
	agentId: z.string().uuid().optional(),
	schedulings: schedulingsSchema,
	status: leadStatusSchema,
	converted: z.boolean().optional(),
	value: z.coerce.number().optional(),
})

type UpdateLeadBodySchema = z.infer<typeof updateLeadBodySchema>

export class UpdateLeadDTO extends createZodDto(updateLeadBodySchema) {}

@Controller('/leads/:leadId')
@ApiTags('Leads')
export class UpdateLeadController {
	constructor(private updateLead: UpdateLeadUseCase) {}

	@Put()
	@Roles('Admin', 'Agent')
	@UseZodGuard('body', updateLeadBodySchema)
	@HttpCode(201)
	async handle(
		@Body() body: UpdateLeadBodySchema,
		@Param('leadId') leadId: string,
		@CurrentUser() currentAgent: Agent,
	) {
		const { agentId, status, schedulings, converted, value } = body
		const result = await this.updateLead.execute({
			leadId,
			agentId,
			status,
			schedulings,
			converted,
			value,
			requester: currentAgent,
		})

		if (result.isLeft()) {
			const error = result.value

			switch (error.constructor) {
				case LeadNotFoundError:
					throw new ConflictException(error.message)
				default:
					throw new BadRequestException(error.message)
			}
		}
	}
}

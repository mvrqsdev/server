import { Body, ConflictException, Controller, HttpCode, Post } from '@nestjs/common'
import {
	ApiBody,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiOperation,
} from '@nestjs/swagger'
import { createZodDto, UseZodGuard } from 'nestjs-zod'
import { z } from 'zod'
import { CreateLeadUseCase } from '@/domain/real-state/application/use-cases/create-lead.use-case'
import { LeadAlreadyExistsError } from '@/domain/real-state/application/use-cases/errors/lead-already-exists.error'
import { NoAgentInRouletteError } from '@/domain/real-state/application/use-cases/errors/no-agent-in-roulette.error'

const createLeadBodySchema = z.object({
	name: z.string().describe('Nome do Lead'),
	whatsappNumber: z.string().describe('Telefone do Lead'),
	email: z.string().email().describe('lead@email.com'),
})

type CreateLeadBodySchema = z.infer<typeof createLeadBodySchema>

export class CreateLeadDTO extends createZodDto(createLeadBodySchema) {}

@Controller('/leads')
export class CreateLeadController {
	constructor(private createLead: CreateLeadUseCase) {}

	@Post()
	@ApiOperation({
		operationId: 'createLead',
		summary: 'Create Lead',
		description: 'Create a lead with a basic data.',
		tags: ['Leads'],
	})
	@ApiBody({
		type: CreateLeadDTO,
		schema: {
			example: {
				name: 'João da Silva',
				email: 'joao@email.com',
				whatsappNumber: '+5551999490880',
			},
		},
	})
	@ApiCreatedResponse({
		description: 'Lead cadastrado com sucesso.',
	})

	@ApiConflictResponse({
		description: 'Conflito nos dados informados.',
	})
	@UseZodGuard('body', createLeadBodySchema)
	@HttpCode(201)
	async handle(@Body() body: CreateLeadBodySchema) {
		const { name, email, whatsappNumber } = body

		const result = await this.createLead.execute({
			name,
			email,
			whatsappNumber,
		})

		if (result.isLeft()) {
			const error = result.value

			switch (error.constructor) {
				case NoAgentInRouletteError:
					throw new ConflictException(error.message)
				case LeadAlreadyExistsError:
					throw new ConflictException(error.message)
			}
		}
	}
}
